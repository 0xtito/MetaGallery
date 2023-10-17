"use client";

import React, { useRef } from "react";
import { TrackedPlane } from "@coconut-xr/natuerlich/react";
import type { Mesh } from "three";
import { RigidBody, RapierRigidBody } from "@react-three/rapier";

import { SpacialPlaneProps } from "@/utils/types";

function SpacialPlane({
  plane,
  name,
  orientation = "horizontal",
  mass = 1,
  color,
}: SpacialPlaneProps) {
  const ref = useRef<Mesh>(null);
  const rigidRef = useRef<RapierRigidBody>(null);

  return (
    <RigidBody
      ref={rigidRef}
      colliders={"trimesh"}
      canSleep={false}
      type="fixed"
    >
      <TrackedPlane ref={ref} plane={plane}>
        {color ? (
          <meshPhongMaterial wireframe color={color} />
        ) : (
          <meshPhongMaterial wireframe color="black" />
        )}
      </TrackedPlane>
    </RigidBody>
  );
}
export default React.memo(SpacialPlane);
