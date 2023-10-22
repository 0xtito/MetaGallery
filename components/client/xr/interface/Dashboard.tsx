"use client";

import {
  RootContainer,
  Container,
  Image,
  Text,
  Object,
  DefaultStyleProvider,
  tailwindAPI,
} from "@coconut-xr/koestlich";
import {
  Glass,
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
        gapColumn={32}
        pixelSize={0.001}
        precision={1}
      >
        <Container flexDirection="column" alignItems="center" gapRow={16}>
          <TabBar defaultValue={1} flexGrow={1}>
            <Glass borderRadius={32} padding={8}>
              <TabBarItem value={1} icon={<Home />}>
                <Text>Home</Text>
              </TabBarItem>
            </Glass>
            <Glass borderRadius={32} padding={8}>
              <TabBarItem value={2} icon={<ShoppingCart />}>
                <Text>Market</Text>
              </TabBarItem>
            </Glass>
            <Glass borderRadius={32} padding={8}>
              <TabBarItem value={3} icon={<ShoppingCart />}>
                <Text>Market</Text>
              </TabBarItem>
            </Glass>
          </TabBar>
        </Container>

        <Glass borderRadius={32} padding={8}>
          <Suspense fallback={<ActivityIndicator size="lg" />}>
            <Inventory />
          </Suspense>
        </Glass>
      </RootContainer>
    </Grabbable>
  );

  return (
    <Grabbable position={[-0.5, 1.5, -0.5]}>
      <RootContainer
        flexDirection="row"
        gapColumn={32}
        pixelSize={0.001}
        precision={1}
      >
        <Container flexDirection="row" alignItems={"center"}>
          <Glass borderRadius={32} padding={8} height={"32%"}>
            <TabBar defaultValue={1} flexGrow={1}>
              <TabBarItem value={1} icon={<Home />}>
                <Text>Home</Text>
              </TabBarItem>
              <TabBarItem value={2} icon={<ShoppingCart />}>
                <Text>Market</Text>
              </TabBarItem>
            </TabBar>
          </Glass>
        </Container>
        <Glass borderRadius={32} padding={8}>
          <Suspense fallback={<ActivityIndicator size="lg" />}>
            <Inventory />
          </Suspense>
        </Glass>
      </RootContainer>
    </Grabbable>
  );
}

export default Dashboard;
