import { useFrame } from "@react-three/fiber";
import { ScriptProps } from "next/script";
import React, { Ref } from "react";
import { useScroll } from "@react-three/drei";

function Camera(
  //   { children }: { children: JSX.Element },
  props: ScriptProps,
  ref: Ref<THREE.PerspectiveCamera>
) {
  const scroll = useScroll();
  useFrame(() => {});

  return <></>;
}

export default React.forwardRef(Camera);
