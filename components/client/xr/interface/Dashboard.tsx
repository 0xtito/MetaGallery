"use client";

import {
  RootContainer,
  Container,
  Image,
  Text,
  Object,
  DefaultStyleProvider,
  tailwindAPI,
  ExtendedThreeEvent,
  ContainerNode,
} from "@coconut-xr/koestlich";
import {
  Glass,
  TabBar,
  TabBarItem,
  ActivityIndicator,
} from "@coconut-xr/apfel-kruemel";
import React, { Suspense, useState, useRef, useEffect, useMemo } from "react";
import {
  Home,
  ShoppingCart,
  MessageCircle,
} from "@coconut-xr/lucide-koestlich";
import { IconButton } from "@coconut-xr/apfel-kruemel";
import { Inventory } from "@/components/server/xr";
import { ThreeEvent } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { Grabbable } from "@coconut-xr/natuerlich/defaults";
import useButtonListener from "@/hooks/useButtonListener";
import { useTrackControllers } from "@/hooks";

function Dashboard() {
  const [activeTab, setActiveTab] = useState(1);
  // const
  const [position, setPosition] = useState<Vector3>(
    new Vector3(-0.5, 1.5, -0.5)
  );

  const interfaceRef = useRef<typeof RootContainer>(null);
  const isXPressed = useButtonListener("x-button");
  const isYPressed = useButtonListener("y-button");
  const [leftController, rightController] = useTrackControllers();

  const memoX = useMemo(() => isXPressed, [isXPressed]);
  const memoY = useMemo(() => isYPressed, [isYPressed]);

  useEffect(() => {
    if (memoX && memoY && leftController) {
      setPosition(leftController.position);
      // interfaceRef!.current.position = leftController.position;
    }
  }, [memoX, memoY]);

  const handleChangeTab = (
    e: ExtendedThreeEvent<PointerEvent>,
    newNumber: number
  ) => {
    console.log("e", e);
    if (activeTab !== newNumber) {
      // console.log("isXPressed", isXPressed);
      setActiveTab(newNumber);
    }
  };

  const handleRelease = (e: ThreeEvent<PointerEvent>) => {};

  return (
    // <Grabbable position={[-0.5, 1.5, -0.5]}>
    <RootContainer
      position={position}
      flexDirection="row"
      gapColumn={32}
      pixelSize={0.001}
      precision={1}
    >
      <Container flexDirection="row" alignItems="center" gapRow={16}>
        <Glass borderRadius={32} padding={8}>
          <IconButton
            size="md"
            platter
            selected={activeTab === 1}
            onPointerDown={(e) => handleChangeTab(e, 1)}
          >
            <Home />
          </IconButton>
        </Glass>
        <Glass borderRadius={32} padding={8}>
          <IconButton
            size="md"
            platter
            selected={activeTab == 2}
            onPointerDown={(e) => handleChangeTab(e, 2)}
          >
            <ShoppingCart />
          </IconButton>
        </Glass>
        <Glass borderRadius={32} padding={8}>
          <IconButton
            size="md"
            platter
            selected={activeTab === 3}
            onPointerDown={(e) => handleChangeTab(e, 3)}
          >
            <MessageCircle />
          </IconButton>
        </Glass>
      </Container>

      <Glass borderRadius={32} padding={8}>
        <Suspense fallback={<ActivityIndicator size="lg" />}>
          <Inventory />
        </Suspense>
      </Glass>
    </RootContainer>
  );
}

export default Dashboard;
