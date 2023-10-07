"use client";
import React, { useEffect } from "react";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import {
  Box,
  Text,
  PerspectiveCamera,
  ScrollControls,
  useScroll,
  Scroll,
} from "@react-three/drei";
import * as THREE from "three";

import FloatingContainer from "./FloatingContainer";
import Stars from "./Stars";
import Foundation from "./objects/Foundation";
import { wrapText } from "@/utils";
import Camera from "./Camera";
import FinalDestination from "./FinalDestination";

function Scene() {
  const cameraRef = React.useRef<THREE.PerspectiveCamera>(null!);
  const floatingContainer1Ref = React.useRef<THREE.Mesh>(null!);
  const floatingContainer2Ref = React.useRef<THREE.Mesh>(null!);
  const scroll = useScroll();
  const [cameraPosition, setCameraPosition] = React.useState({
    x: 0,
    y: 0,
    z: 8,
  });

  const stop1 = React.useMemo(() => new THREE.Vector3(0, 0, -2), []);
  const stop2 = React.useMemo(() => new THREE.Vector3(0, 0, -200), []);
  const stop3 = React.useMemo(() => new THREE.Vector3(0, 0, -400), []);

  const handleWheel = (event: React.WheelEvent) => {
    cameraRef.current.position.z += event.deltaY * 0.02;
  };

  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
    uColor: { value: new THREE.Color(0.5, 0.5, 0.5) },
  };

  // works but types are funky so just setting to any for now
  const handleMouseMove = (event: any) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = (event.clientY / window.innerHeight) * 2 - 1;

    if (floatingContainer1Ref.current && floatingContainer2Ref.current) {
      floatingContainer1Ref.current.rotation.x = y * 0.2;
      floatingContainer1Ref.current.rotation.y = x * 0.2;

      floatingContainer2Ref.current.rotation.x = y * 0.3;
      floatingContainer2Ref.current.rotation.y = x * 0.3;
    }
  };

  return (
    <div
      className="z-10 top-0 left-0 h-full w-full"
      onWheel={handleWheel}
      onPointerMove={handleMouseMove}
    >
      <Canvas>
        <ScrollControls pages={3}>
          <PerspectiveCamera
            ref={cameraRef}
            position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
            makeDefault
          />
          <Camera ref={cameraRef} />

          {/* <OrbitControls makeDefault /> */}

          {/* Fog */}
          <fogExp2 args={[0xff00ff, 0.8]} />

          {/* Stars */}
          <Stars ref={cameraRef} />

          {/* First Stop */}
          <FloatingContainer position={stop1} ref={floatingContainer1Ref}>
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

          {/* <FinalDestination /> */}

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
          {/* </Scroll> */}
        </ScrollControls>

        {/* Light */}
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}

export default React.forwardRef(Scene);
