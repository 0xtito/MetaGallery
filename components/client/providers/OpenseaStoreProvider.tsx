"use client";
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  Suspense,
  useEffect,
} from "react";
import { useSafeAuthContext } from "@/components/client/providers/SafeAuthProvider";
import { OpenSeaSDK, Chain, NFT } from "opensea-js";
import { Web3Provider } from "@ethersproject/providers";

import * as ethers from "ethers";

interface StoreNFT {
  collection: string;
  name: string;
  nftId: string;
  imageUrl: string;
  price: number;
}

interface OpenseaStore {
  nfts: StoreNFT[] | null;
  storeReady: boolean;
}

const OpenseaStoreContext = React.createContext<OpenseaStore>({
  nfts: null,
  storeReady: false,
});

const api = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!;
const priv = process.env.NEXT_PUBLIC_PRIVATE_KEY!;

export const useOpenseaStore = () => {
  const context = React.useContext(OpenseaStoreContext);
  if (!context) {
    throw new Error(
      "useOpenseaStore must be used within a OpenseaStoreProvider"
    );
  }
  return context;
};

function OpenseaStoreProvider({ children }: { children: React.ReactNode }) {
  const { web3Provider } = useSafeAuthContext();
  const [nfts, setNfts] = useState<StoreNFT[]>([]);
  const [storeReady, setStoreReady] = useState<boolean>(false);
  let timer: NodeJS.Timeout;

  const PROVIDER = new ethers.providers.AlchemyProvider("matic", api);

  const TEST_WALLET = new ethers.Wallet(priv, PROVIDER);

  useEffect(() => {
    const getNFTs = async (_web3Provider?: Web3Provider) => {
      // const openseaSDK = new OpenSeaSDK(_web3Provider, {
      const openseaSDK = new OpenSeaSDK(PROVIDER, {
        chain: Chain.Polygon,
        apiKey: process.env.NEXT_PUBLIC_OPENSEA_API_KEY!,
        // @ts-expect-error
        logger: (arg: string) => {},
        // wallet: web3Provider?.getSigner(),
        wallet: TEST_WALLET,
      });
      // using these contracts to demo
      const nftContractAddresses = [
        "0x718dbac2a901ccf3e40b9c9fb4b555803b85085d", // Gwei Guzzlers
        "0xd7a5d5ab0a4085a0fc5c6cc199b89a134b6b246c", // Robotos Genesis
        "0xdb46d1dc155634fbc732f92e853b10b288ad5a1d", // Lens Protocol Profiles
      ];

      let fetchedNfts: StoreNFT[] = [];
      for (const contract of nftContractAddresses) {
        const res = await openseaSDK.api.getNFTsByContract(
          Chain.Polygon,
          contract,
          4
        );
        // fetchedNfts = [...fetchedNfts, ...res.nfts];

        fetchedNfts = [
          ...fetchedNfts,
          ...res.nfts.map((nft: NFT) => {
            return {
              collection: nft.collection,
              name: nft.name,
              nftId: nft.identifier,
              imageUrl: nft.image_url,
              price: 0,
            };
          }),
        ];
      }

      let storeNfts: StoreNFT[] = [];
      for (const nft of fetchedNfts) {
        try {
          const order = await openseaSDK.api.getOrder({
            side: "ask",
            assetContractAddress: nft.contract,
            tokenId: nft.identifier,
          });
          storeNfts = [
            ...storeNfts,
            {
              collection: nft.collection,
              name: nft.name,
              nftId: nft.identifier,
              imageUrl: nft.image_url,
              price: parseInt(order.currentPrice._hex, 16),
            },
          ];
        } catch (err) {
          console.log(err);
        }
      }
      console.log(fetchedNfts);

      setNfts(fetchedNfts);
      setStoreReady(true);
    };
    // if (web3Provider && !storeReady) {
    //   getNFTs(web3Provider);
    // }
    if (!storeReady) {
      // testing
      getNFTs();
    }
  }, [web3Provider, storeReady]);

  const values = useMemo(() => {
    console.log(nfts);

    return {
      nfts,
      storeReady,
    };
  }, [nfts, storeReady]);

  return (
    <OpenseaStoreContext.Provider value={values}>
      {children}
    </OpenseaStoreContext.Provider>
  );
}

export default OpenseaStoreProvider;
