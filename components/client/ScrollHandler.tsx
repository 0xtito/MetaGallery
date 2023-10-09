import React, { useEffect, Ref, useRef } from "react";
import { ScrollControls, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ScrollHandlerProps {
  children: React.ReactNode;
  stops: THREE.Vector3[];
  currentStop: number;
}

function ScrollHandler(
  { children, stops, currentStop }: ScrollHandlerProps,
  ref: Ref<THREE.PerspectiveCamera>
) {
  const currentStopRef = useRef<number>(0);
  const data = useScroll();
  const cameraRef = ref as React.MutableRefObject<THREE.PerspectiveCamera>;

  useFrame(() => {
    if (cameraRef.current) {
      const targetZ = stops[currentStop].z;
      const diff = targetZ - cameraRef.current.position.z;
      // console.log(targetZ);
      // console.log(diff);

      // Apply damping animation for smooth transition
      // cameraRef.current.position.z += diff; // Adjust 0.1 for speed
    }
  });

  const scrollValues = React.useMemo(() => {
    return {
      first: {
        active: data.visible(0, 1 / 3),
        reverse: false,
        value: data.range(0, 1 / 3),
      },
      second: {
        active: data.visible(1 / 3, 2 / 3),
        reverse: false,
        value: data.range(1 / 3, 2 / 3),
      },
      third: {
        active: data.visible(2 / 3, 1),
        reverse: false,
        value: data.range(2 / 3, 1),
      },
    };
  }, [data.offset]);

  const _handleScroll = () => {};

  // useEffect(() => {
  //   console.log(scrollValues);
  // }, [scrollValues]);

  // const handleScroll = () => {
  //   console.log("scrolling");
  //   while (cameraRef.current.position.z !== stops[currentStop].z) {
  //     const targetZ = stops[currentStop].z;
  //     const diff = targetZ - cameraRef.current.position.z;
  //     console.log(targetZ);
  //     console.log(diff);

  //     // Apply damping animation for smooth transition
  //     cameraRef.current.position.z -= 0.01; // Adjust 0.1 for speed
  //   }
  //   currentStopRef.current = currentStop;
  // };

  // useEffect(() => {
  //   console.log("currentStop changed", currentStop);
  //   console.log("currentStopRef", currentStopRef.current);
  //   if (currentStop !== currentStopRef.current) {
  //     handleScroll();
  //   }
  // }, [currentStop]);

  //   return <ScrollControls pages={3}>{children}</ScrollControls>;
  return <>{children}</>;
}

export default React.forwardRef(ScrollHandler);
