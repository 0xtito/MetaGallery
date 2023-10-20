"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ADAPTER_EVENTS,
  CHAIN_NAMESPACES,
  UserInfo,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthOptions } from "@web3auth/modal";
import Safe, {
  EthersAdapter,
  SafeAccountConfig,
  SafeFactory,
} from "@safe-global/protocol-kit";
import SafeApiKit from "@safe-global/api-kit";
import { Web3AuthModalPack, AuthKitSignInData } from "@safe-global/auth-kit";
import {
  SafeTransaction,
  SafeTransactionDataPartial,
  EthAdapter,
} from "@safe-global/safe-core-sdk-types";
import { Web3AuthEventListener } from "@safe-global/auth-kit";
import { ethers } from "ethers";

interface Web3AuthContextProps {
  web3AuthModalPack?: Web3AuthModalPack;
  safeAuthSignInResponse?: AuthKitSignInData | null;
  web3Provider?: ethers.providers.Web3Provider;
  userInfo?: Partial<UserInfo>;
  safeAddress?: string;
  login: (() => Promise<void>) | null;
}

export const Web3AuthContext = React.createContext<Web3AuthContextProps>({
  login: null,
});

function Web3AuthProvider({ children }: { children: React.ReactNode }) {
  const [web3AuthModalPack, setWeb3AuthModalPack] =
    useState<Web3AuthModalPack>();
  const [safeAuthSignInResponse, setSafeAuthSignInResponse] =
    useState<AuthKitSignInData | null>(null);
  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider>();
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>();
  const [safeAddress, setSafeAddress] = useState<string>();

  const connectedHandler: Web3AuthEventListener = (data) =>
    console.log("CONNECTED", data);
  const disconnectedHandler: Web3AuthEventListener = (data) =>
    console.log("DISCONNECTED", data);

  const handleWeb3Auth = async () => {
    const options: Web3AuthOptions = {
      clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "", // https://dashboard.web3auth.io/
      web3AuthNetwork: "mainnet",
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x89",
        // https://chainlist.org/
        rpcTarget:
          "https://polygon-mainnet.infura.io/v3/c0a29833f77b4afa8ad9c53ebfbd7f8e" ||
          process.env.NEXT_PUBLIC_ALCHEMY_API_URL ||
          "",
      },
      uiConfig: {
        theme: "dark",
        loginMethodsOrder: ["google", "facebook", "github"],
      },
    };

    const modalConfig = {
      [WALLET_ADAPTERS.TORUS_EVM]: {
        label: "torus",
        showOnModal: false,
      },
      [WALLET_ADAPTERS.METAMASK]: {
        label: "metamask",
        showOnDesktop: true,
        showOnMobile: false,
      },
    };

    const web3AuthModalPack = new Web3AuthModalPack({
      txServiceUrl: "https://safe-transaction-mainnet.safe.global",
    });

    const openloginAdapter = new OpenloginAdapter({
      loginSettings: {
        mfaLevel: "none",
      },
      adapterSettings: {
        uxMode: "popup",
        whiteLabel: {
          name: "MetaGallery",
        },
      },
    });

    console.log("web3AuthModalPack", web3AuthModalPack);

    try {
      await web3AuthModalPack.init({
        options,
        adapters: [openloginAdapter],
        modalConfig,
      });

      console.log("web3AuthModalPack after init", web3AuthModalPack);
    } catch (error) {
      console.log(error);
    }

    web3AuthModalPack.subscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);

    web3AuthModalPack.subscribe(
      ADAPTER_EVENTS.DISCONNECTED,
      disconnectedHandler
    );

    setWeb3AuthModalPack(web3AuthModalPack);

    return () => {
      web3AuthModalPack.unsubscribe(ADAPTER_EVENTS.CONNECTED, connectedHandler);
      web3AuthModalPack.unsubscribe(
        ADAPTER_EVENTS.DISCONNECTED,
        disconnectedHandler
      );
    };
  };

  useEffect(() => {
    handleWeb3Auth();
  }, []);

  //   useEffect(() => {
  //     const handleLogin = async () => {
  //       await login();
  //     };

  //     if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
  //       handleLogin();
  //     }
  //   }, [web3AuthModalPack]);

  const login = React.useCallback(async () => {
    if (!web3AuthModalPack) return;

    const signInInfo = await web3AuthModalPack.signIn();
    console.log("SIGN IN RESPONSE: ", signInInfo);

    const userInfo = await web3AuthModalPack.getUserInfo();
    console.log("USER INFO: ", userInfo);

    setSafeAuthSignInResponse(signInInfo);
    setUserInfo(userInfo || undefined);
    // setProvider(web3AuthModalPack.getProvider() as SafeEventEmitterProvider)
    const provider =
      web3AuthModalPack.getProvider() as ethers.providers.ExternalProvider;
    console.log("PROVIDER:", provider);
    setWeb3Provider(new ethers.providers.Web3Provider(provider));
  }, [web3AuthModalPack]);

  const handleLogin = useCallback(async () => {
    await login();
  }, [web3AuthModalPack, login]);

  const logout = async () => {
    if (!web3AuthModalPack) return;

    await web3AuthModalPack.signOut();

    // setWeb3Provider(null)
    setSafeAuthSignInResponse(null);
  };

  // Safe Deployment
  const deploySafe = async () => {
    try {
      const signer = web3Provider?.getSigner();
      if (!signer) throw new Error("No signer found");
      const ethAdapterOwner: EthersAdapter = new EthersAdapter({
        ethers,
        signerOrProvider: signer,
      });

      console.log("Deploying Safe...");
      const safeFactory: SafeFactory = await SafeFactory.create({
        // @ts-expect-error
        ethAdapter: ethAdapterOwner,
      });

      const safeAccountConfig: SafeAccountConfig = {
        owners: [await signer.getAddress()],
        threshold: 1,
      };

      const safeSdkOwner: Safe = await safeFactory.deploySafe({
        safeAccountConfig,
      });

      const _safeAddress: string = await safeSdkOwner.getAddress();
      setSafeAddress(_safeAddress);

      console.log("Your Safe has been deployed:");
      console.log(`https://polygonscan.com/address/${_safeAddress}`);
      console.log(`https://app.safe.global/matic:${_safeAddress}`);
    } catch (error) {
      console.error(error);
    }
  };

  const values = useMemo(() => {
    return {
      web3AuthModalPack,
      safeAuthSignInResponse,
      web3Provider,
      userInfo,
      safeAddress,
      login: handleLogin,
    };
  }, [
    web3AuthModalPack,
    safeAuthSignInResponse,
    web3Provider,
    userInfo,
    safeAddress,
    handleLogin,
  ]);

  return (
    <Web3AuthContext.Provider value={values}>
      {children}
    </Web3AuthContext.Provider>
  );
}

export default Web3AuthProvider;
