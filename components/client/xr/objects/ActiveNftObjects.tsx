"use client";

import React, { useEffect, useRef, useState } from "react";

import { useActiveNftsContext } from "@/components/client/providers/ActiveNftsProvider";
import { useTrackControllers } from "@/hooks";
import { NftObject } from "@/components/client/xr/objects";
import { nft } from "@/utils/types";

function ActiveNftObjects() {
  const { activeNfts, handleRemoveNft } = useActiveNftsContext();

  useEffect(() => {
    console.log("activeNfts changed");
    console.log("activeNfts", activeNfts);

    () => {
      console.log("unmounting ActiveNftObjects");
    };
  }, [activeNfts]);

  if (!activeNfts) return null;

  console.log("rerendered ActiveNftObjects");

  return (
    <>
      {activeNfts.map(({ nft, spawnPosition }) => (
        <NftObject
          key={`${nft.title}+${nft.id}`}
          nft={nft}
          position={spawnPosition}
        />
      ))}
    </>
  );
}

export default React.memo(ActiveNftObjects);
