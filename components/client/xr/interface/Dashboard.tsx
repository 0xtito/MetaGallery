"use client";

import {
  RootContainer,
  Container,
  Image,
  Text,
  Object,
  DefaultStyleProvider,
} from "@coconut-xr/koestlich";
import {
  Button,
  Glass,
  IconButton,
  Fonts,
  TabBar,
  TabBarItem,
  ActivityIndicator,
} from "@coconut-xr/apfel-kruemel";
import { Suspense, useState, useRef } from "react";
import { Home, ShoppingCart } from "@coconut-xr/lucide-koestlich";

import { Inventory } from "@/components/server/xr";
import { GrabPhysics } from "@/components/client/xr/physics";
import { ThreeEvent } from "@react-three/fiber";
import type { Mesh } from "three";
import { Grabbable } from "@coconut-xr/natuerlich/defaults";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(1);
  const interfaceRef = useRef<Mesh>(null);

  const handleGrab = (e: ThreeEvent<PointerEvent>) => {
    console.log("handleGrab");
  };

  const handleRelease = (e: ThreeEvent<PointerEvent>) => {};

  return (
    <Grabbable position={[-0.5, 1.5, -0.5]}>
      <RootContainer
        flexDirection="row"
        // alignItems="center"
        // maxHeight={"100%"}
        gapColumn={32}
        pixelSize={0.001}
        precision={1}
      >
        <Container flexDirection="row" alignItems={"center"}>
          <Glass borderRadius={32} padding={8} height={"32%"}>
            <TabBar defaultValue={1} flexGrow={1}>
              <TabBarItem
                // onClick={() => setActiveTab(1)}
                value={1}
                icon={<Home />}
              >
                <Text>Home</Text>
              </TabBarItem>
              <TabBarItem
                value={2}
                // onClick={() => setActiveTab(2)}
                icon={<ShoppingCart />}
              >
                <Text>Market</Text>
              </TabBarItem>
            </TabBar>
          </Glass>
        </Container>
        {/* <Container> */}
        <Glass borderRadius={32} padding={8}>
          {/* <DefaultStyleProvider color="white"> */}
          <Suspense fallback={<ActivityIndicator size="lg" />}>
            <Inventory />
          </Suspense>
          {/* </DefaultStyleProvider> */}
        </Glass>
        {/* </Container> */}
      </RootContainer>
    </Grabbable>
  );
}

export default Dashboard;
