"use client";

import React, {
  useState,
  Suspense,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import {
  Container,
  Image,
  Object,
  Text,
  DefaultStyleProvider,
} from "@coconut-xr/koestlich";

import { ExtendedThreeEvent } from "@coconut-xr/koestlich";

import { nft } from "@/utils/types";
// import { useTrackControllers } from "@/hooks";
import { useActiveNftsContext } from "@/components/client/providers/ActiveNftsProvider";
import useButtonListener from "@/hooks/useButtonListener";

interface DisplayNftProps {
  nft: nft;
  isOwned?: boolean;
}

function DisplayNft({ nft, isOwned = true }: DisplayNftProps) {
  // const [leftController, rightController] = useTrackControllers();
  const { handleSetNft, activeNfts, handleRemoveNft } = useActiveNftsContext();
  const [isActive, setIsActive] = useState(false);

  const isAPressed = useButtonListener("a-button");
  const isBPressed = useButtonListener("b-button");

  const handleClick = useCallback(
    (e: ExtendedThreeEvent<PointerEvent>) => {
      // const isActive = activeNfts?.find((activeNft) => activeNft.id === nft.id);

      if (isActive && isBPressed && handleRemoveNft) {
        console.log("removing nft: ", nft);
        handleRemoveNft(nft.id);
        setIsActive(false);
      }

      // might need to create a button listener for the controller
      // it is simply running too much
      if (isAPressed && !isActive && handleSetNft) {
        console.log("setting a new nft: ", nft);
        handleSetNft(nft);
        setIsActive(true);
      }
    },
    [isActive, isAPressed, isBPressed, handleSetNft, handleRemoveNft, nft]
  );

  return (
    <>
      {/* eslint-disable-next-line */}
      <Image
        onPointerMove={handleClick}
        index={0}
        aspectRatio={1}
        width={"auto"}
        height={"auto"}
        url={nft.url}
        borderRadius={3}
        // onPointerDown={handleClick}
      />
      <Text fontSize={12} index={1} marginTop={8}>
        {nft.title}
      </Text>
    </>
  );
}

export default React.memo(DisplayNft);
