"use client";

import React from "react";
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
  // Here is where we will fetch all of the users NFTs
  // then we will pass them into the InventoryItems component

  // const nfts = [DEMO_NFT_URL, DEMO_NFT_URL, DEMO_NFT_URL, DEMO_NFT_URL];

  // const nfts = getUsersNFTs();

  const nfts: nft[] = React.useMemo(
    () => [
      {
        title: "Lonely Nights",
        url: "/assets/demo/lonely_nights.jpeg",
        id: "321321321",
      },
      {
        title: "Lonely Nights",
        url: "/assets/demo/lonely_nights.jpeg",
        id: "321321321",
      },
      {
        title: "Lonely Nights",
        url: "/assets/demo/lonely_nights.jpeg",
        id: "32143242",
      },
      {
        title: "Lonely Nights",
        url: "/assets/demo/lonely_nights.jpeg",
        id: "443425",
      },
      {
        title: "Lonely Nights",
        url: "/assets/demo/lonely_nights.jpeg",
        id: "132132145",
      },
      {
        title: "Lonely Nights",
        url: "/assets/demo/lonely_nights.jpeg",
        id: "64113214",
      },
      {
        title: "Lonely Nights",
        url: "/assets/demo/lonely_nights.jpeg",
        id: "765646542",
      },
      {
        title: "Lonely Nights",
        url: "/assets/demo/lonely_nights.jpeg",
        id: "83213215",
      },
    ],
    []
  );

  console.log(nfts);

  return <InventoryContainer nfts={nfts} />;
}

export default React.memo(Inventory);
