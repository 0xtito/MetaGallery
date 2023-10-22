"use client";

import React, { Suspense, useId, useMemo } from "react";
import {
  Container,
  Image,
  Object,
  Text,
  DefaultStyleProvider,
} from "@coconut-xr/koestlich";
import {
  ListItem,
  List,
  ActivityIndicator,
  Glass,
} from "@coconut-xr/apfel-kruemel";

import { GrabPhysics } from "@/components/client/xr/physics";

import { chunkArray } from "@/utils";
import { nft } from "@/utils/types";
import { DisplayNft } from "@/components/client/xr/interface";

function InventoryContainer({ nfts }: { nfts: nft[] }) {
  const chunkedNfts = useMemo(() => chunkArray(nfts, 3), [nfts]);
  // const id = useId();

  console.log("nfts", nfts);
  console.log("chunkedNfts", chunkedNfts);

  // return nfts.map(({ title, url, additionalInfo }, index) => {
  return (
    <Container
      padding={16}
      flexDirection="column"
      gapRow={32}
      marginY={12}
      overflow="scroll"
      maxHeight={400}
      width={"100%"}
    >
      {chunkedNfts.map(({ nfts, id }, index) => (
        <Container
          key={id}
          flexDirection="row"
          gapColumn={12}
          width={"100%"}
          overflow="scroll"
        >
          {/* <List flexGrow={1} flexDirection="row" gapColumn={12} width={"100%"}> */}

          {nfts.map((nft) => (
            <Container
              key={nft.id}
              flexDirection="column"
              backgroundColor={"grey"}
              padding={12}
              backgroundOpacity={0.5}
              borderRadius={12}
              // overflow="hidden"
            >
              <DefaultStyleProvider color="white">
                <Suspense fallback={<ActivityIndicator size="lg" />}>
                  <DisplayNft nft={nft} />
                </Suspense>
              </DefaultStyleProvider>
            </Container>
          ))}
        </Container>
      ))}
    </Container>
  );
}

export default React.memo(InventoryContainer);
