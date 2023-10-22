"use client";

import React, { useEffect, useState, useContext, useMemo } from "react";

import { useSafeAuthContext } from "@/components/client/providers/SafeAuthProvider";
import WebXRInit from "@/components/client/xr/WebXRInit";
import TestPush from "./push/TestPush";
// import { MintNft } from "./web3";
import dynamic from "next/dynamic";
import {
  FadeTransition,
  LoadingSpinner,
  Toaster,
} from "@/components/client/ui";
import * as ethers from "ethers";

// plz dont steal our 5 dollars
const TOTALLY_NOT_A_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY!;

import { abi } from "@/utils/abi/MetaGalleryContractAbi.json";
import { METAGALLERY_ADDRESS } from "@/utils/constants";
import { AuthKitSignInData } from "@safe-global/auth-kit";

const MintNft = dynamic(() => import("@/components/client/web3/MintNft"));

// const buttonStates

async function checkIfUserHasNFT(contract: ethers.Contract, address: string) {
  const count = await contract.balanceOf(address);
  const ans = parseInt(count._hex, 16);
  return ans;
}

function XRLoginPage() {
  const {
    web3AuthModalPack,
    safeAuthSignInResponse,
    web3Provider,
    userInfo,
    safeAddress,
    login,
  } = useSafeAuthContext();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintTx, setMintTx] = useState<string>("");
  const [isMintSuccessful, setIsMintSuccessful] = useState<boolean>(false);

  const [showSignInToaster, setShowSignInToaster] = useState<boolean>(false);
  const [showMintedToaster, setShowMintedToaster] = useState<boolean>(false);
  const [showPushToaster, setShowPushToaster] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Sign in");
  const [startXR, setStartXR] = useState<boolean>(false);

  const appWallet = useMemo(
    () => new ethers.Wallet(TOTALLY_NOT_A_PRIVATE_KEY, web3Provider),
    [web3Provider]
  );

  const contract = useMemo(
    () => new ethers.Contract(METAGALLERY_ADDRESS, abi, appWallet),
    [appWallet]
  );

  useEffect(() => {
    const handleAddToGroup = async () => {
      try {
        setIsLoading(true);
        console.log("adding user to group");
        console.log(safeAuthSignInResponse!.eoa); // must wait until token is on chain
        const res = await fetch(
          `/api/push/addUser/${safeAuthSignInResponse!.eoa}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // body: null,
          }
        );
      } catch (err) {
        console.log(err);
        // set
      }
      setShowPushToaster(true);
      setIsLoading(false);
      setStartXR(true); // just to let them go anyway
    };

    if (isMintSuccessful) {
      // setStartAddToGroup(true);
      handleAddToGroup();
    }
  }, [isMintSuccessful, safeAuthSignInResponse]);

  useEffect(() => {
    const checkIfMinted = async (
      contract: ethers.Contract,
      safeAuthSignInResponse: AuthKitSignInData
    ) => {
      const value: number = await checkIfUserHasNFT(
        contract,
        safeAuthSignInResponse.eoa
      );
      // setAlreadyMinted(value ? true : false);
      console.log("already minted", value ? true : false);
      console.log("already minted", value > 0 ? true : false);
      if (value > 0) {
        setIsLoading(false);
        setStartXR(true);
      } else {
        setIsMinting(true);
      }
    };

    console.log("XRLoginPage useEffect");
    console.log("web3AuthModalPack", web3AuthModalPack);
    console.log("userInfo", userInfo);
    if (!!userInfo?.typeOfLogin && safeAuthSignInResponse) {
      setIsSignedIn(true);
      checkIfMinted(contract, safeAuthSignInResponse);
    }
  }, [userInfo, web3AuthModalPack, contract, safeAuthSignInResponse]);

  const handleWeb3SignIn = async () => {
    console.log("handleWeb3SignIn");
    setIsLoading(true);
    setButtonText("");
    if (!!login) {
      await login();
      console.log("logged in");
      console.log("userInfo", userInfo);
      setShowSignInToaster(true);
      // setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col justify-between">
        <div className="p-4 flex justify-between items-center">
          <div className="text-white flex-1 flex justify-center">
            <h1 className="text-2xl tracking-wide">MetaGallery</h1>
          </div>
          <a
            href={"https://ethglobal.com/events/ethonline2023"}
            className="absolute right-4 text-white hover:underline"
            target="_blank"
          >
            ethOnline 2023
          </a>
        </div>

        <div className="flex flex-1 flex-col justify-center items-center space-y-8">
          <h2 className="text-4xl tracking-wide text-center">
            Display your NFTs the way they were meant to be displayed
          </h2>
          <button
            className="bg-white text-black px-6 py-3 rounded-md"
            disabled={isLoading}
            onClick={
              !isSignedIn ? () => handleWeb3SignIn() : () => setStartXR(true)
            }
          >
            <FadeTransition
              show={isLoading}
              afterExit={() => setButtonText("Begin")}
            >
              <LoadingSpinner />
            </FadeTransition>
            {buttonText}
          </button>
        </div>

        <div className="p-4">
          <span>by </span>
          <a
            className="underline"
            href="https://github.com/0xtito"
            target="_blank"
          >
            tito
          </a>
          <span> and </span>
          <a
            className="underline"
            href="https://github.com/racampos"
            target="_blank"
          >
            raphael
          </a>
        </div>
      </div>
      <Toaster
        titleText="Successfully Signed in!"
        subText="Thanks to Safe and Web3Auth :)"
        success={true}
        show={showSignInToaster}
        setShow={setShowSignInToaster}
      />
      <Toaster
        titleText="Your free NFT has been minted!"
        subText={`Check your wallet ${(
          <a href={mintTx} target="_blank" className="underline">
            here
          </a>
        )}`}
        success={true}
        show={showMintedToaster}
        setShow={setShowMintedToaster}
      />
      <Toaster
        titleText={`Your in a ${(
          <a href="https://push.org/" target="_blank" className="underline">
            Push
          </a>
        )} Group!`}
        subText="Thanks to Safe and Web3Auth :)"
        success={true}
        show={showPushToaster}
        setShow={setShowPushToaster}
      />
      {isMinting && (
        <MintNft
          toAddress={safeAuthSignInResponse!.eoa}
          contract={contract}
          setMintTx={setMintTx}
          setIsMintSuccessful={setIsMintSuccessful}
        />
      )}
    </>
  );
}

export default XRLoginPage;
