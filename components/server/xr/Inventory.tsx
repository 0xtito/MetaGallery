"use client";

import React, { useEffect, useState } from "react";
/**
 * Since this will be a server component, we will need to know
 * The user that is signed in, so that we can retrieve their
 * inventory from the database.
 */

import { InventoryContainer } from "@/components/client/xr/interface";

import { DEMO_NFT_URL } from "@/utils/constants";
// import { ActivityIndicator } from "@coconut-xr/apfel-kruemel";
import { Suspense } from "react";

import { nft } from "@/utils/types";

import { DEMO_NFTS } from "@/utils/constants";

// function getUsersNFTs() {
// // Here we will fetch the users NFTs from the database
// //and return them as an array of objects
// //with the following structure:
// //{
// //  title: string;
// //  url: string;
// //  additionalInfo?: string;
// //}

//   return nfts;
// }

// will be a server component, but need to reorganize
function Inventory() {
  // const { nfts: _nfts, storeReady } = useOpenseaStore();
  // all my homies hate opensea
  // const [nfts, setNfts] = useState<StoreNFT[]>([]);
  // const [init, setInit] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log("storeReady", storeReady);
  //   console.log("nfts", nfts);
  //   if (storeReady && _nfts && !init) {
  //     setInit(true);
  //     setNfts(_nfts);
  //   }
  // }, [storeReady, _nfts, init, nfts]);

  // Here is where we will fetch all of the users NFTs
  // then we will pass them into the InventoryItems component

  // const nfts: nft[] = React.useMemo(
  //   () => [
  //     {
  //       title: "Lonely Nights",
  //       url: "/assets/demo/lonely_nights.jpeg",
  //       id: "4325421",
  //     },
  //     {
  //       title: "Lonely Nights",
  //       url: "/assets/demo/lonely_nights.jpeg",
  //       id: "321321321",
  //     },
  //     {
  //       title: "Lonely Nights",
  //       url: "/assets/demo/lonely_nights.jpeg",
  //       id: "32143242",
  //     },
  //     {
  //       title: "Lonely Nights",
  //       url: "/assets/demo/lonely_nights.jpeg",
  //       id: "443425",
  //     },
  //     {
  //       title: "Lonely Nights",
  //       url: "/assets/demo/lonely_nights.jpeg",
  //       id: "132132145",
  //     },
  //     {
  //       title: "Lonely Nights",
  //       url: "/assets/demo/lonely_nights.jpeg",
  //       id: "64113214",
  //     },
  //     {
  //       title: "Lonely Nights",
  //       url: "/assets/demo/lonely_nights.jpeg",
  //       id: "765646542",
  //     },
  //     {
  //       title: "Lonely Nights",
  //       url: "/assets/demo/lonely_nights.jpeg",
  //       id: "83213215",
  //     },
  //   ],
  //   []
  // );

  const nfts = React.useMemo(
    () => [
      {
        name: "Lonely Nights",
        imageUrl: "/assets/demo/lonely_nights.jpeg",
        nftId: "4325421",
        collection: "Eponym by ART AI",
      },
      {
        collection: "gwei-guzzlers",
        name: "GWEI GUZZLERS #597",
        nftId: "597",
        imageUrl:
          "https://i.seadn.io/s/raw/files/350166d11e15e80b35bf6a4cc586d69b.png?w=500&auto=format",
        price: 100000000000000000,
      },
      {
        collection: "gwei-guzzlers",
        name: "GWEI GUZZLERS #600",
        nftId: "600",
        imageUrl:
          "https://i.seadn.io/s/raw/files/7b33b43025c2f3e0f7f9a8c7cfb488a0.png?w=500&auto=format",
        price: 100000000000000000,
      },
      {
        collection: "gwei-guzzlers",
        name: "GWEI GUZZLERS #596",
        nftId: "596",
        imageUrl:
          "https://i.seadn.io/s/raw/files/07190e78c6ee5fe5eeba4b785bd449d7.png?w=500&auto=format",
        price: 100000000000000000,
      },
      {
        collection: "gwei-guzzlers",
        name: "GWEI GUZZLERS #595",
        nftId: "595",
        imageUrl:
          "https://i.seadn.io/s/raw/files/914b08cf17fa2545826ffbce60b27fb2.png?w=500&auto=format",
        price: 10000000000000000000,
      },
      {
        collection: "gwei-guzzlers",
        name: "GWEI GUZZLERS #594",
        nftId: "594",
        imageUrl:
          "https://i.seadn.io/s/raw/files/8ef09adae6fb38fa29767714b4698206.png?w=500&auto=format",
        price: 100000000000000000,
      },
      {
        collection: "robotos-genesis",
        name: "Vroomba Kittyboto",
        nftId: "14",
        imageUrl:
          "https://i.seadn.io/gae/cK9ECdn7CxZZkQVLnFpGOgK7n_cGcbz1USutKfVQUKoSvxMUVTPUrRRoVyCWO92DxQDVBo8rXboyBrrdneN7t5jLcf7ksmQR6ENmRh0?w=500&auto=format",
        price: 40000000000000000,
      },
      {
        collection: "robotos-genesis",
        name: "Kitty Camboto",
        nftId: "13",
        imageUrl:
          "https://i.seadn.io/gae/bkOwNesGyXyyNqxoFIIq5HsDYm_BGo8ec3xMIQalSxR6vlgaQjBTht_MHAUl6I9G5nCPrREy0-Llr7d-A6ZmMFe5vRqQB-_0ae_w?w=500&auto=format",
        price: 60000000000000000,
      },
      {
        collection: "robotos-genesis",
        name: "Skate Kittyboto",
        nftId: "12",
        imageUrl:
          "https://i.seadn.io/gae/eWxqtlMO8JWFQYeHef2dnIlOuvMpNfy7ZOB0yj_I4cN74dWB609_ZMknVNqCFyRqCHUqJbhev5zdeilD8DwHSf1UBlGggOdKGVGK5w?w=500&auto=format",
        price: 30000000000000000,
      },
      {
        collection: "robotos-genesis",
        name: "Wheels Kittyboto",
        nftId: "10",
        imageUrl:
          "https://i.seadn.io/gae/uU27yIQydI33Pv5A63zy0oNDr6klZADm9SXrISo9RczkwCzpalnrDW96-rZp-yO0nPcjGfq0AVyufQAn0QMJlZIzUxT0dLQCn3H_?w=500&auto=format",
        price: 80000000000000000,
      },
    ],
    []
  );

  // const nfts = DEMO_NFTS;

  return <InventoryContainer nfts={nfts} />;
}

export default React.memo(Inventory);
