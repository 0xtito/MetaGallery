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
  Button,
} from "@coconut-xr/apfel-kruemel";
import { ArrowBigLeft, ArrowBigRight } from "@coconut-xr/lucide-koestlich";

import { GrabPhysics } from "@/components/client/xr/physics";

import { chunkArray } from "@/utils";
import { nft } from "@/utils/types";
import { DisplayNft } from "@/components/client/xr/interface";

function InventoryContainer({ nfts }: { nfts: nft[] }) {
  const chunkedNfts = useMemo(() => chunkArray(nfts, 2), [nfts]);
  // const id = useId();

  console.log("nfts", nfts);
  console.log("chunkedNfts", chunkedNfts);

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
              key={nft.id}
              flexGrow={1}
              backgroundOpacity={0.5}
              flexDirection="column"
              alignContent="center"
              // margin={10}
              padding={12}
              // border={0}
              // border={}
              borderRadius={12}
              backgroundColor={"#d1d5db"}
            >
              <DefaultStyleProvider color="white">
                <Suspense fallback={<ActivityIndicator size="lg" />}>
                  <DisplayNft nft={nft} />
                </Suspense>
              </DefaultStyleProvider>
              <Text>{nft.title}</Text>
            </Container>
          ))}
        </Container>
      ))}
      <Container flexDirection="row" justifyContent="center" gapColumn={12}>
        <Button size="md" platter>
          <ArrowBigLeft />
        </Button>
        <Button size="md" platter>
          <ArrowBigRight />
        </Button>
      </Container>
    </Container>
  );

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
