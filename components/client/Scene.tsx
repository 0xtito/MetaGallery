"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  Box,
  Text,
  PerspectiveCamera,
  ScrollControls,
} from "@react-three/drei";
import * as THREE from "three";

import { useControls } from "leva";
import { Perf } from "r3f-perf";

import { FloatingContainer, Island, Stars } from "@/components/client/objects";
import { wrapText } from "@/utils";
import ScrollHandler from "./ScrollHandler";
import { LoadingAssetsProvider } from "@/components/client/providers";

import LoadingScreen from "@/components/client/landingPage/LoadingScreen";

type LandRefType = {
  landRef: React.MutableRefObject<
    THREE.Mesh<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.Material | THREE.Material[],
      THREE.Object3DEventMap
    >
  >;
  doorRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
};

function Scene() {
  const [showLoadingScreen, setShowLoadingScreen] = React.useState(true);
  const cameraRef = React.useRef<THREE.PerspectiveCamera>(null!);

  const floatingContainer1Ref = React.useRef<THREE.Mesh>(null!);
  const floatingContainer2Ref = React.useRef<THREE.Mesh>(null!);

  const [cameraPosition, setCameraPosition] = React.useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const {
    perfVisible,
    position,
    rotation,
    fullDoorRotation,
    doorRotation,
    fullDoorPosition,
    lightPosition,
    lightScale,
    lightRotation,
    targetPosition,
  } = useControls({
    perfVisible: false,
    position: {
      value: {
        x: -0.4,
        y: -2,
        z: -11,
      },
      step: 0.1,
    },
    rotation: {
      value: {
        x: 0,
        y: -1.6,
        z: 0,
      },
      step: 0.05,
    },
    fullDoorPosition: {
      value: {
        x: -4.35,
        y: 1.4,
        z: -0.2,
      },
      step: 0.05,
    },
    fullDoorRotation: {
      value: {
        x: 0,
        y: 1.57,
        z: 0,
      },
      step: 0.005,
    },
    doorRotation: {
      value: {
        x: 0,
        y: 0,
        z: 0,
      },
      step: 0.05,
    },
    lightPosition: {
      value: {
        x: 0,
        y: 0,
        z: 0,
      },
      step: 0.05,
    },
    lightScale: {
      value: {
        x: 1,
        y: 1,
        z: 1,
      },
      step: 0.05,
    },
    lightRotation: {
      value: {
        x: 0,
        y: 0,
        z: 0,
      },
      step: 0.05,
    },
    targetPosition: {
      value: {
        x: 0,
        y: 0,
        z: 0,
      },
      step: 0.05,
    },
  });

  const stop1 = React.useMemo(() => new THREE.Vector3(0, 0, -8), []);
  const stop2 = React.useMemo(() => new THREE.Vector3(0, 0, -208), []);
  const stop3 = React.useMemo(() => new THREE.Vector3(0, 0, -408), []);

  const handleWheel = (event: React.WheelEvent) => {
    cameraRef.current.position.z += event.deltaY * 0.02;
    setCameraPosition((curValues) => ({
      ...curValues,
      z: cameraRef.current.position.z,
    }));
  };

  // Define the stop positions
  const stops = React.useMemo(
    () => [
      new THREE.Vector3(0, 0, -8),
      new THREE.Vector3(0, 0, -208),
      new THREE.Vector3(0, 0, -408),
    ],
    []
  );
  const [currentStop, setCurrentStop] = React.useState(0);
  const [lastScrollTime, setLastScrollTime] = React.useState(Date.now());
  const initialRotation = React.useRef(rotation);

  // works but types are funky so just setting to any for now
  const handleScroll = (event: any) => {
    const currentTime = Date.now();
    console.log("in handleScroll Scene");
    if (currentTime - lastScrollTime > 500) {
      // 500ms debounce
      console.log("in handleScroll Scene if");
      if (event.deltaY > 0 && currentStop < stops.length - 1) {
        setCurrentStop((currentValue) => currentValue + 1);
      } else if (event.deltaY < 0 && currentStop > 0) {
        setCurrentStop((currentValue) => currentValue - 1);
      }
    }
    setLastScrollTime(currentTime);
  };

  /**
   * SO when the user scrolls, they will move from the current section to the next.
   * Thus we need to keep track of what section they are in.
   * we also need to keep track of the camera position, or using the data.range, we can wait until it reaches the next section
   * which is 1
   * we will add dampenign after we get the basic functionality working
   */

  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
    uColor: { value: new THREE.Color(0.5, 0.5, 0.5) },
  };

  // works but types are funky so just setting to any for now
  const handleMouseMove = (event: any) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;

    /**
     * Will eventually have better control over the refs
     */
    if (floatingContainer1Ref.current && floatingContainer2Ref.current) {
      floatingContainer1Ref.current.rotation.x = y * 0.2;
      floatingContainer1Ref.current.rotation.y = x * 0.2;
    }

    if (floatingContainer2Ref.current) {
      floatingContainer2Ref.current.rotation.x = y * 0.3;
      floatingContainer2Ref.current.rotation.y = x * 0.3;
    }
  };

  // console.log(NEXT_PUBLIC_VERCEL_URL!);

  return (
    <>
      {/* {showLoadingScreen && (
        <LoadingButton setShowLoadingScreen={setShowLoadingScreen} />
      )} */}
      <Canvas
        className="fixed top-0 left-0 h-screen w-screen outline-none"
        onPointerMove={handleMouseMove}
        onWheel={handleWheel}
        flat
      >
        <LoadingAssetsProvider>
          {showLoadingScreen && (
            <LoadingScreen
              showLoadingScreen={showLoadingScreen}
              setShowLoadingScreen={setShowLoadingScreen}
            />
          )}

          {/* Debug */}
          <Perf position="top-left" visible={perfVisible} />

          <ScrollControls pages={3}>
            <ScrollHandler
              stops={stops}
              currentStop={currentStop}
              ref={cameraRef}
            >
              <PerspectiveCamera
                ref={cameraRef}
                position={[0, 0, cameraPosition.z]}
                makeDefault
              />

              {/* Fog */}
              <fogExp2 args={[0xff00ff, 0.8]} />

              {/* Stars */}
              <Stars ref={cameraRef} />

              {/* <Scroll> */}
              {/* First Stop */}
              {/* <FloatingContainer position={stop1} ref={floatingContainer1Ref}>
              <Text
                position={[0, 0, 0.51]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
                characters="abcdefghijklmnopqrstuvwxyz0123456789!"
              >
                {wrapText(
                  // hacky solution, need to improve
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus ut purus a erat euismod placerat. Vestibulum tristique lacinia augue sed placerat. Suspendisse eget lacus sit amet arcumalesuada bibendum et ut ante. Aliquam neque metus, euismod uthendrerit nec, tincidunt quis arcu. Pellentesque sed est ac lacuselementum sodales. Phasellus iaculis, odio ac malesuada congue, nibhante faucibus lorem, non pellentesque ante velit ut ipsum. Sed duinibh, pharetra ac tempus sed, sodales a risus.",
                  40
                )}
              </Text>
            </FloatingContainer> */}

              {/* Second Stop */}
              <FloatingContainer position={stop2} ref={floatingContainer2Ref}>
                <Text
                  position={[0, 0, 0.51]}
                  fontSize={0.2}
                  color="white"
                  anchorX="center"
                  anchorY="middle"
                  characters="abcdefghijklmnopqrstuvwxyz0123456789!"
                >
                  {wrapText(
                    // hacky solution, need to improve
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Phasellus ut purus a erat euismod placerat. Vestibulum tristique lacinia augue sed placerat. Suspendisse eget lacus sit amet arcumalesuada bibendum et ut ante. Aliquam neque metus, euismod uthendrerit nec, tincidunt quis arcu. Pellentesque sed est ac lacuselementum sodales. Phasellus iaculis, odio ac malesuada congue, nibhante faucibus lorem, non pellentesque ante velit ut ipsum. Sed duinibh, pharetra ac tempus sed, sodales a risus.",
                    40
                  )}
                </Text>
              </FloatingContainer>

              {/* Island - keeping it in the beginning for now */}
              <Island
                position={new THREE.Vector3(position.x, position.y, position.z)}
                rotation={new THREE.Euler(rotation.x, rotation.y, rotation.z)}
                fullDoorRotation={
                  new THREE.Euler(
                    fullDoorRotation.x,
                    fullDoorRotation.y,
                    fullDoorRotation.z
                  )
                }
                doorRotation={
                  new THREE.Euler(
                    doorRotation.x,
                    doorRotation.y,
                    doorRotation.z
                  )
                }
                fullDoorPosition={
                  new THREE.Vector3(
                    fullDoorPosition.x,
                    fullDoorPosition.y,
                    fullDoorPosition.z
                  )
                }
                lightPosition={
                  new THREE.Vector3(
                    lightPosition.x,
                    lightPosition.y,
                    lightPosition.z
                  )
                }
                lightScale={
                  new THREE.Vector3(lightScale.x, lightScale.y, lightScale.z)
                }
                lightRotation={
                  new THREE.Euler(
                    lightRotation.x,
                    lightRotation.y,
                    lightRotation.z
                  )
                }
              />

              {/* FInal Stop */}
              <group position={stop3}>
                <Text position={[0, 2, -9]} fontSize={0.5} color="white">
                  Your art should be alive
                </Text>
                {/* Land mass */}
                <Box position={[0, -1, -10]} args={[4, 1, 6]}>
                  <meshStandardMaterial color="gray" />
                </Box>

                {/* Door */}
                <Box position={[0, 0, -9]} args={[1, 2, 0.1]}>
                  <meshStandardMaterial color="brown" />
                </Box>
              </group>
            </ScrollHandler>
          </ScrollControls>
        </LoadingAssetsProvider>
      </Canvas>
    </>
  );
}

export default Scene;
