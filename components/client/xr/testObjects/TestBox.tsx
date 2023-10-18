"use client";

import React, { useRef } from "react";
import {
  RapierRigidBody,
  RigidBody,
  euler,
  quat,
  vec3,
} from "@react-three/rapier";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useInputSources } from "@coconut-xr/natuerlich/react";

import type { Mesh, Vector3 } from "three";
import { isXIntersection } from "@coconut-xr/xinteraction";
import GrabPhysics from "../physics/GrabPhysics";

function TestBox(props: any) {
  const rigidRef = useRef<RapierRigidBody>(null);

  const inputSources = useInputSources();
  const ref = useRef<Mesh>(null);
  const downState = useRef<{
    pointerId: number;
    pointToObjectOffset: Vector3;
  }>();

  const handleGrab = (e: ThreeEvent<PointerEvent>) => {
    if (rigidRef.current) {
      rigidRef.current.setTranslation(vec3(e.point), true);
      rigidRef.current.resetTorques(true);
      rigidRef.current.resetForces(true);
      rigidRef.current.setAngvel(vec3({ x: 0, y: 0, z: 0 }), true);
      rigidRef.current.setGravityScale(0, true);
    } else {
      console.log("rigidRef.current is not set");
    }
  };

  const handleRelease = (e: ThreeEvent<PointerEvent>, velocity?: Vector3) => {
    if (rigidRef.current) {
      rigidRef.current?.setGravityScale(1, true);
      console.log("velocity", velocity);
      rigidRef.current.setLinvel(vec3(velocity), true);
    } else {
      console.log("rigidRef.current is not set");
    }
  };

  return (
    <RigidBody
      ref={rigidRef}
      colliders={"cuboid"}
      position={props.position ?? [0, 0, 0]}
      canSleep={false}
      linearDamping={0.5}
      angularDamping={0.7}
      ccd={true}
    >
      <GrabPhysics
        ref={ref}
        handleGrab={handleGrab}
        handleRelease={handleRelease}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
        <meshBasicMaterial color={props.color ?? "red"} />
      </GrabPhysics>
    </RigidBody>
  );
}

export default React.memo(TestBox);
