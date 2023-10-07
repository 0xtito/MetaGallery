"use client";
import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

import type { PropsWithoutRef, Ref } from "react";

interface StarsProps
  extends PropsWithoutRef<React.JSX.IntrinsicElements["group"]> {
  // Add any additional props here
}

function Stars({ ...rest }: StarsProps, ref: Ref<THREE.PerspectiveCamera>) {
  const starsRef = useRef<THREE.Points>(null!);
  const scroll = useScroll();

  useEffect(() => {
    console.log(scroll);
  }, [scroll]);

  const particlesCount = 10000;
  const particlePositions = new Float32Array(particlesCount * 3);
  const colors = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    const i3 = i * 3;

    particlePositions[i3] = (Math.random() - 0.5) * 1500;
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 1500;
    particlePositions[i3 + 2] = (Math.random() - 0.8) * 1500;
    colors[i] = Math.random();
  }

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.00001;
      starsRef.current.rotation.y += 0.00001;
    }
  });

  return (
    <group>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            count={particlesCount}
            itemSize={3}
            array={particlePositions}
          />
        </bufferGeometry>
        <pointsMaterial size={0.5} color="#00ffff" transparent />
      </points>
    </group>
  );
}

export default React.forwardRef(Stars);
