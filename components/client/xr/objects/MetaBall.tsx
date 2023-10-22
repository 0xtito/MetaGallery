"use client";

import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { ThreeEvent } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { useGraph } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { GrabPhysics } from "@/components/client/xr/physics";
import { useGLTF, useTexture } from "@react-three/drei";

function MetaBall(props: any) {
  const [ready, setReady] = React.useState(false);
  const rigidRef = useRef<RapierRigidBody>(null);
  const ref = useRef<Mesh>(null);
  const rigidAndMeshRef = useRef({
    rigidRef: rigidRef,
    ref: ref,
  });

  useGLTF.preload("/assets/demo/metagallery_ball.glb");
  useTexture.preload("/assets/demo/logo.png");

  const { scene } = useGLTF("/assets/demo/metagallery_ball.glb");
  const texture = useTexture("/assets/demo/logo.png");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const { nodes } = useGraph(clone);

  console.log("nodes", nodes);
  console.log("texture", texture);

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
    // <Suspense fallback={}>
    <RigidBody
      name={"testBox-physics"}
      ref={rigidRef}
      colliders={"ball"}
      position={new Vector3(0.1, 1, -0.5)}
      canSleep={false}
      linearDamping={0.5}
      angularDamping={0.7}
      ccd={true}
    >
      <GrabPhysics
        id={"testBox"}
        isAnchorable={true}
        ref={rigidAndMeshRef}
        handleGrab={handleGrab}
        handleRelease={handleRelease}
      >
        {/* @ts-expect-error */}
        <bufferGeometry {...nodes.Sphere.geometry} />
        <meshBasicMaterial map={texture} map-flipY={false} />
      </GrabPhysics>
    </RigidBody>
    // </Suspense>
  );
}

export default React.memo(MetaBall);
