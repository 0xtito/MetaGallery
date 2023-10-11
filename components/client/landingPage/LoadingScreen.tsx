"use client";

import React, { useRef, useContext, useEffect } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { Html, Plane } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

// @ts-ignore
import fragment from "@/shaders/landingPage/fragment.glsl";
// @ts-ignore
import vertex from "@/shaders/landingPage/vertex.glsl";
import { LoadingContext } from "./LoadingProvider";

function LoadingScreen({
  setShowLoadingScreen,
  showLoadingScreen,
}: {
  setShowLoadingScreen: (value: boolean) => void;
  showLoadingScreen: boolean;
}) {
  const { total, loaded } = useContext(LoadingContext);

  const MyShaderMaterial = (
    <shaderMaterial
      transparent
      uniforms={{
        uAlpha: { value: 1 },
      }}
      vertexShader={vertex}
      fragmentShader={fragment}
    />
  );

  useEffect(() => {
    console.log({ loaded, total });
    // if (!showLoadingScreen) {
    if (loaded === total) {
      console.log("loaded = total");
      gsap.to(MyShaderMaterial.props.uniforms.uAlpha, {
        duration: 3,
        value: 0,
        onComplete: () => {
          setShowLoadingScreen(false);
        },
      });
    }
  }, [showLoadingScreen]);
  return (
    <mesh>
      <boxGeometry args={[2, 2, 1, 1]} />
      {MyShaderMaterial}
      {/* <Html center>
        <div className="absolute flex items-center justify-center w-full h-full">
          <div className=" loading-container">
            <div className=" loading-bar w-64 h-2 bg-white border-2 border-white"></div>
          </div>
        </div>
      </Html> */}
    </mesh>
  );
}

export default LoadingScreen;
