"use client";

import React, { Suspense, useMemo } from "react";
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

function InventoryContainer({ nfts }: { nfts: nft[] }) {
  const chunkedNfts = useMemo(() => chunkArray(nfts, 3), [nfts]);

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

          {nfts.map(({ title, url, id, additionalInfo }) => (
            <Container
              key={id}
              flexDirection="column"
              backgroundColor={"grey"}
              padding={12}
              backgroundOpacity={0.5}
              borderRadius={12}
              // overflow="hidden"
            >
              <DefaultStyleProvider color="white">
                <Suspense fallback={<ActivityIndicator size="lg" />}>
                  {/* eslint-disable-next-line */}
                  <Image
                    index={0}
                    aspectRatio={1}
                    width={"auto"}
                    height={"auto"}
                    url={url}
                    borderRadius={3}
                  />
                  <Text fontSize={12} index={1} marginTop={8}>
                    {title}
                  </Text>
                </Suspense>
              </DefaultStyleProvider>
            </Container>
          ))}
        </Container>
      ))}
    </Container>
  );
}

// <ListItem
//   key={id}
//   flexDirection="column"
//   alignItems="center"
//   padding={12}
//   marginY={8}
// >
//   <Suspense fallback={<ActivityIndicator size="lg" />}>
//     {/* eslint-disable-next-line */}
//     <Image
//       index={0}
//       aspectRatio={1}
//       width={200}
//       url={url}
//       borderRadius={3}
//     />
//     <Text index={1}>{title}</Text>
//   </Suspense>
// </ListItem>

export default React.memo(InventoryContainer);
