"use client";

import React, { useState, Suspense, useMemo } from "react";
import {
  Container,
  Image,
  Object,
  Text,
  DefaultStyleProvider,
} from "@coconut-xr/koestlich";

import { nft } from "@/utils/types";

interface NftComponentProps {
  nft: nft;
  isOwned: boolean;
}

function NftComponent({ nft, isOwned }: NftComponentProps) {
  const handleClick = () => {};

  return (
    <>
      {/* eslint-disable-next-line */}
      <Image
        index={0}
        aspectRatio={1}
        width={"auto"}
        height={"auto"}
        url={nft.url}
        borderRadius={3}
        onPointerDown={handleClick}
      />
      <Text fontSize={12} index={1} marginTop={8}>
        {nft.title}
      </Text>
    </>
  );
}

export default NftComponent;
