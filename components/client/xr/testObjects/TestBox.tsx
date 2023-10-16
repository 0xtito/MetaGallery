"use client";

import React, { useEffect, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { RoundedBox } from "@react-three/drei";
import {
  RapierRigidBody,
  RigidBody,
  euler,
  quat,
  vec3,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useInputSources } from "@coconut-xr/natuerlich/react";

import type { Mesh, Vector3 } from "three";
import { isXIntersection } from "@coconut-xr/xinteraction";

function TestBox(props: any) {
  const rigidRef = useRef<RapierRigidBody>(null);

  const inputSources = useInputSources();
  const ref = useRef<Mesh>(null);
  const downState = useRef<{
    pointerId: number;
    pointToObjectOffset: Vector3;
  }>();

  return (
    <RigidBody
      ref={rigidRef}
      colliders={"cuboid"}
      position={props.position ?? [0, 0, 0]}
      canSleep={false}
    >
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
            };
            rigidRef.current?.setTranslation(vec3(e.point), true);
          }
        }}
        onPointerUp={(e) => {
          if (downState.current?.pointerId != e.pointerId) {
            return;
          }
          downState.current = undefined;
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
          rigidRef.current?.setTranslation(vec3(e.point), true);
        }}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color={props.color ?? "red"} />
      </mesh>
    </RigidBody>
  );
}

export default React.memo(TestBox);
