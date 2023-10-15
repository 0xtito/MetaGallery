"use client";

import React, { useEffect, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { RoundedBox } from "@react-three/drei";

function TestBox(props: any) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [-0.5, 1, 0.5],
    ...props,
  }));

  return (
    // <mesh ref={ref}>
    // @ts-expect-error
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color="red" />
    </mesh>
    // </mesh>
  );
}

export default TestBox;
