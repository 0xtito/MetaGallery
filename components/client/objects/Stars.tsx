"use client";
import React, { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

// @ts-ignore
import fragment from "@/shaders/stars/fragment.glsl";
// @ts-ignore
import vertex from "@/shaders/stars/vertex.glsl";

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

  const innerStars = 2000;
  const outerStars = 8000;
  const totalStars = innerStars + outerStars;

  // const innerStarsPositions = new Float32Array(innerStars * 3);
  // const outerStarsPositions = new Float32Array(outerStars * 3);
  // const totalStarsPositions = new Float32Array(totalStars * 3);
  // const scaleArr = new Float32Array(totalStars);

  const particlePositions = new Float32Array(totalStars * 3);
  // const colorsArr = new Float32Array(totalStars * 3);
  for (let i = 0; i < totalStars * 3; i++) {
    const i3 = i * 3;

    particlePositions[i3] = (Math.random() - 0.5) * 1250;
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 1250;
    particlePositions[i3 + 2] = (Math.random() - 0.8) * 1250;
    // colorsArr[i] = Math.random();
  }

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x += 0.00001;
      starsRef.current.rotation.y += 0.00001;
    }
  });

  // const starsMaterial = new THREE.ShaderMaterial({
  //   uniforms: {
  //     uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
  //     uSize: { value: 200 },
  //   },
  //   vertexShader: ``,
  //   fragmentShader: ``,
  //   transparent: true,
  //   blending: THREE.AdditiveBlending,
  //   depthWrite: false,
  // });

  return (
    <group>
      <points ref={starsRef}>
        {/* <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            count={innerStars}
            itemSize={3}
            array={innerStarsPositions}
          />
        </bufferGeometry>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            count={outerStars}
            itemSize={3}
            array={outerStarsPositions}
          />
        </bufferGeometry>
        <shaderMaterial
          uniforms={{
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            // uSize: { value: 200 },
            time: { value: 0 },
            resolution: {
              value: new THREE.Vector2(window.innerWidth, window.innerHeight),
            },
          }}
          vertexShader={vertex}
          fragmentShader={fragment}
          depthWrite
          transparent
          blending={THREE.AdditiveBlending}
        /> */}
        {/* <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            count={innerStars}
            itemSize={3}
            array={particlePositions}
          /> */}
        {/* <bufferAttribute
            attach={"attributes-color"}
            count={colorsArr.length / 3}
            itemSize={3}
            array={colorsArr}
          /> */}
        {/* </bufferGeometry> */}
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            count={totalStars}
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
