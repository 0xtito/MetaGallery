"use client";

import React, {
  forwardRef,
  useRef,
  Ref,
  MutableRefObject,
  useMemo,
  ForwardedRef,
} from "react";
import type { Vector3, Mesh } from "three";
import type { ThreeEvent } from "@react-three/fiber";
import { isXIntersection } from "@coconut-xr/xinteraction";
import { useRapier } from "@react-three/rapier";

interface GrabProps {
  children: React.ReactNode;
  handleGrab: (e: ThreeEvent<PointerEvent>) => void;
  handleRelease: (e: ThreeEvent<PointerEvent>, velocity?: Vector3) => void;
}

// downState: {
//     pointerId: number;
//     pointToObjectOffset: Vector3;
//   };

const GrabPhysics = forwardRef(
  (
    { children, handleGrab, handleRelease }: GrabProps,
    meshRef: ForwardedRef<Mesh>
  ) => {
    const downState = useRef<{
      pointerId: number;
      pointToObjectOffset: Vector3;
      positions: Vector3[];
      timestamps: number[];
    }>();
    // const positionsRef = useRef<Vector3[]>([]);
    // const timestampsRef = useRef<number[]>([]);
    const maxEntries = useMemo(() => 5, []);

    const ref = useMemo(() => meshRef as MutableRefObject<Mesh>, [meshRef]);

    return (
      <mesh
        ref={ref}
        onPointerDown={(e) => {
          if (
            ref.current != null &&
            downState.current == null &&
            isXIntersection(e)
          ) {
            e.stopPropagation();
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            console.log("ref.current.position", ref.current.position);
            downState.current = {
              pointerId: e.pointerId,
              pointToObjectOffset: ref.current.position.clone().sub(e.point),
              positions: [],
              timestamps: [],
            };
            //   rigidRef.current?.setTranslation(vec3(e.point), true);
            handleGrab(e);
          }
        }}
        onPointerUp={(e) => {
          if (downState.current?.pointerId != e.pointerId) {
            return;
          }
          if (downState.current.positions.length > 1) {
            console.log("downState positions", downState.current.positions);
            console.log("downState timestamps", downState.current.timestamps);
            const lastIndex = downState.current.positions.length - 1;
            const deltaTime =
              (downState.current.timestamps[lastIndex] -
                downState.current.timestamps[0]) /
              1000; // in seconds
            const deltaPosition = downState.current.positions[lastIndex]
              .clone()
              .sub(downState.current.positions[0]);
            const velocity = deltaPosition.divideScalar(deltaTime);
            console.log("velocity", velocity);
            console.log("deltaPosition", deltaPosition);
            console.log("deltaTime", deltaTime);
            console.log("e.timeStamp", e.timeStamp);

            downState.current = undefined;

            handleRelease(e, velocity);
          }
        }}
        onPointerMove={(e) => {
          if (
            ref.current == null ||
            downState.current == null ||
            e.pointerId != downState.current.pointerId ||
            !isXIntersection(e)
          ) {
            return;
          }
          // rigidRef.current?.setTranslation(vec3(e.point), true);

          handleGrab(e);

          // console.log();

          const timeStamp = new Date().getTime();
          // console.log("timeStamp", timeStamp);
          downState.current.positions.push(e.point);
          downState.current.timestamps.push(timeStamp);
          // console.log("downState positions", downState.current.positions);
          // console.log("downState timestamps", downState.current.timestamps);

          if (downState.current.positions.length > maxEntries) {
            downState.current.positions.shift();
            downState.current.timestamps.shift();
          }
        }}
      >
        {children}
      </mesh>
    );
  }
);

export default React.memo(GrabPhysics);
