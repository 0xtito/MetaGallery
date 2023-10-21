"use client";

import React, { useRef } from "react";
import { RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { ThreeEvent } from "@react-three/fiber";

import type { Mesh, Vector3 } from "three";
import { GrabPhysics } from "@/components/client/xr/physics";

function TestBox(props: any) {
  const rigidRef = useRef<RapierRigidBody>(null);
  const ref = useRef<Mesh>(null);
  const rigidAndMeshRef = useRef({
    rigidRef: rigidRef,
    ref: ref,
  });

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
      rigidRef.current.setLinvel(vec3(velocity), true);
    } else {
      console.log("rigidRef.current is not set");
    }
  };

  return (
    <RigidBody
      name={"testBox-physics"}
      ref={rigidRef}
      colliders={"cuboid"}
      position={props.position ?? [0, 0, 0]}
      canSleep={false}
      linearDamping={0.5}
      angularDamping={0.7}
      ccd={true}
    >
      <GrabPhysics
        name={"testBox"}
        // ref={ref}
        isAnchorable={true}
        ref={rigidAndMeshRef}
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
