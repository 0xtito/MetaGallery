/**
 * Since this will be a server component, we will need to know
 * The user that is signed in, so that we can retrieve their
 * inventory from the database.
 */

import { InventoryContainer } from "@/components/client/xr/interface";

import { DEMO_NFT_URL } from "@/utils/constants";
// import { ActivityIndicator } from "@coconut-xr/apfel-kruemel";
import { Suspense } from "react";

import { nfts } from "@/utils/types";

function getUsersNFTs() {
  // Here we will fetch the users NFTs from the database
  // and return them as an array of objects
  // with the following structure:
  // {
  //   title: string;
  //   url: string;
  //   additionalInfo?: string;
  // }

  // setTimeout(() => {
  //   console.log("fetched user's nfts");
  // }, 1000);

  const nfts: nfts[] = [
    {
      title: "Lonely Nights",
      url: "/assets/demo/lonely_nights.jpeg",
      id: "1",
    },
    {
      title: "Lonely Nights",
      url: "/assets/demo/lonely_nights.jpeg",
      id: "2",
    },
    {
      title: "Lonely Nights",
      url: "/assets/demo/lonely_nights.jpeg",
      id: "3",
    },
    {
      title: "Lonely Nights",
      url: "/assets/demo/lonely_nights.jpeg",
      id: "4",
    },
    {
      title: "Lonely Nights",
      url: "/assets/demo/lonely_nights.jpeg",
      id: "5",
    },
    {
      title: "Lonely Nights",
      url: "/assets/demo/lonely_nights.jpeg",
      id: "6",
    },
    {
      title: "Lonely Nights",
      url: "/assets/demo/lonely_nights.jpeg",
      id: "7",
    },
    {
      title: "Lonely Nights",
      url: "/assets/demo/lonely_nights.jpeg",
      id: "8",
    },
  ];

  return nfts;
}

// will be a server component, but need to reorganize
function Inventory() {
  // Here is where we will fetch all of the users NFTs
  // then we will pass them into the InventoryItems component

  // const nfts = [DEMO_NFT_URL, DEMO_NFT_URL, DEMO_NFT_URL, DEMO_NFT_URL];

  const nfts = getUsersNFTs();

  console.log(nfts);

  return <InventoryContainer nfts={nfts} />;
}

export default Inventory;
