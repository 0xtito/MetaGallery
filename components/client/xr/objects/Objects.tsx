"use client";

import React, { useEffect, useRef, useState } from "react";

import { useActiveNftsContext } from "@/components/client/providers/ActiveNftsProvider";
import { NftObject } from "@/components/client/xr/objects";
import { ActiveNftObjects } from "@/components/client/xr/objects";

function Objects() {
  const { activeNfts } = useActiveNftsContext();

  if (!activeNfts) return null;

  //   return <ActiveNftObjects nfts={activeNfts} />;
  return (
    <>
      <></>
    </>
  );
}

export default Objects;
