"use client";

import React, { Suspense, useId, useMemo } from "react";
import {
  Container,
  Image,
  Object,
  Text,
  DefaultStyleProvider,
  flexAPI,
} from "@coconut-xr/koestlich";
import {
  ListItem,
  List,
  ActivityIndicator,
  Glass,
  IconButton,
} from "@coconut-xr/apfel-kruemel";
import { ArrowBigLeft, ArrowBigRight } from "@coconut-xr/lucide-koestlich";

import { GrabPhysics } from "@/components/client/xr/physics";

import { chunkArray } from "@/utils";
import { nft } from "@/utils/types";
import { DisplayNft } from "@/components/client/xr/interface";
import useButtonListener from "@/hooks/useButtonListener";

function InventoryContainer({ nfts }: { nfts: nft[] }) {
  const [activeTab, setActiveTab] = React.useState(0);
  const chunkedNfts = useMemo(() => chunkArray(nfts, 4), [nfts]);

  return (
    <Container
      // classes="dynamic-text-box"
      flexDirection="column"
      gapRow={16}
      paddingY={16}
      width={"100%"}
      overflow={"hidden"}
    >
      {chunkedNfts.map(({ nfts, id }, index) => (
        <Container
          key={id}
          flexDirection="row"
          justifyContent="space-between"
          gapColumn={12}
        >
          {nfts.map((nft) => (
            <Container
              key={`${nft.nftId}+${nft.name}`}
              flexGrow={1}
              backgroundOpacity={0.5}
              flexDirection="column"
              alignContent="center"
              padding={12}
              borderRadius={12}
              backgroundColor={"#d1d5db"}
            >
              <DefaultStyleProvider color="white">
                <DisplayNft nft={nft} />
              </DefaultStyleProvider>
              <Text>{nft.nftId}</Text>
            </Container>
          ))}
        </Container>
      ))}
      <Container flexDirection="row" justifyContent="center" gapColumn={12}>
        <IconButton
          size="md"
          platter
          // disabled={activeTab === 0}
          onPointerDown={() => {
            if (activeTab === 0) return;
            console.log("next tab");
            setActiveTab((curTab) => curTab - 1);
          }}
        >
          <ArrowBigLeft />
        </IconButton>
        <IconButton
          size="md"
          platter
          // selected={activeTab === 1}
          // disabled={activeTab === chunkedNfts.length - 1}
          onPointerDown={() => {
            // if (activeTab === chunkedNfts.length - 1) return;
            console.log("next tab");
            setActiveTab((curTab) => curTab + 1);
          }}
        >
          <ArrowBigRight />
        </IconButton>
      </Container>
    </Container>
  );
}

export default InventoryContainer;
