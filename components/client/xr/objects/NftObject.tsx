"use client";

import React, { useEffect, useRef, useState } from "react";
import { RapierRigidBody, RigidBody, vec3 } from "@react-three/rapier";
import { ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

import { Mesh, Vector3 } from "three";
import { GrabPhysics } from "@/components/client/xr/physics";
import { useTrackControllers } from "@/hooks";

import { nft } from "@/utils/types";
import type { Texture, Source } from "three";

interface NftObjectProps {
  nft: nft;
  // handleRemoveNft: (nftName: string) => void;
  position?: Vector3;
  type?: "plane" | "box" | "sphere";
}

function NftObject({
  // handleRemoveNft,
  position = new Vector3(0, 2, -1),
  nft,
  type = "plane",
}: NftObjectProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const texture = useTexture(nft.url, (texture) => handleLoad(texture));
  const rigidRef = useRef<RapierRigidBody>(null);
  const ref = useRef<Mesh>(null);
  const rigidAndMeshRef = useRef({
    rigidRef: rigidRef,
    ref: ref,
  });
  const textureSourceRef = useRef<number[]>(null) as React.MutableRefObject<
    number[]
  >;
  const handleLoad = (texture: Texture | Texture[]) => {
    if (Array.isArray(texture)) {
      console.log("texture is an array");
      return;
    }

    console.log("texture loaded");
    console.log("texture", texture);
    const width = texture.source.data?.width ?? 1;
    const height = texture.source.data?.height ?? 1;

    const normalizedWidth = width / height / 2;
    const normalizedHeight = height / width / 2;

    textureSourceRef.current = [normalizedWidth, normalizedHeight];

    setImageLoaded(true);
  };

  useEffect(() => {
    console.log("imageLoaded", imageLoaded);
    console.log("texture", texture);

    return () => {
      console.log("unmounting NftObject");
      texture.dispose();
    };
  }, [imageLoaded, texture]);

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

  if (!imageLoaded) {
    return null;
  }

  return (
    <RigidBody
      name={`${nft.title}-physics`}
      ref={rigidRef}
      colliders={type === "plane" || type === "box" ? "cuboid" : "ball"}
      position={position}
      canSleep={false}
      linearDamping={0.5}
      angularDamping={0.7}
      ccd={true}
    >
      <GrabPhysics
        id={nft.id}
        isAnchorable={true}
        isDeletable={true}
        ref={rigidAndMeshRef}
        handleGrab={handleGrab}
        handleRelease={handleRelease}
      >
        {/* <planeGeometry args={[0.1, 0.1]} /> */}
        {type === "plane" || type === "box" ? (
          <boxGeometry args={[1, 1, 0.001]} />
        ) : (
          <sphereGeometry args={[0.1, 32, 32]} />
        )}
        <meshBasicMaterial map={texture} />
      </GrabPhysics>
    </RigidBody>
  );
}

export default React.memo(NftObject) as typeof NftObject;
