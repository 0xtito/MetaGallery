import React, { Ref } from "react";
import { useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
// @ts-ignore
import fragment from "@/shaders/FloatingContainer/fragment.glsl"; // eslint-disable-line
// @ts-ignore
import vertex from "@/shaders/FloatingContainer/vertex.glsl"; // eslint-disable-line
import { ScriptProps } from "next/script";
import { Center, Html, RoundedBox, Text } from "@react-three/drei";

import { wrapText } from "@/utils";

interface FloatingContainerProps {
  position: THREE.Vector3;
  children: React.ReactNode;
}

function FloatingContainer(
  { children, position }: FloatingContainerProps,
  ref: Ref<THREE.Mesh>
) {
  // const containerRef = React.useRef<THREE.Mesh>(null!);
  const containerRef = ref as React.MutableRefObject<THREE.Mesh>;

  const { size } = useThree();

  const uniforms = {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
    uColor: { value: new THREE.Color(38 / 256, 40 / 245, 55 / 256) }, // White color for the container
  };

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    // <Center>
    <group position={position}>
      <RoundedBox ref={containerRef} args={[5, 5]} radius={0.2} smoothness={4}>
        <shaderMaterial
          vertexShader={vertex}
          fragmentShader={fragment}
          uniforms={uniforms}
          transparent
        />
        {children}
      </RoundedBox>
    </group>
    // </Center>
  );
}

export default React.forwardRef(FloatingContainer);
