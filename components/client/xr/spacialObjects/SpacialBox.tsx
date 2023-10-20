"use client";

import React, { useRef } from "react";
import { TrackedMesh } from "@coconut-xr/natuerlich/react";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";

import { SpacialBoxProps } from "@/utils/types";
import type { Mesh } from "three";

function SpacialBox({ mesh, color, name, mass = 1 }: SpacialBoxProps) {
  const ref = useRef<Mesh>(null);
  const rigidRef = useRef<RapierRigidBody>(null);

  return (
    <>
      <RigidBody
        name={name}
        ref={rigidRef}
        colliders={"trimesh"}
        canSleep={false}
        type={"fixed"}
      >
        <TrackedMesh ref={ref} mesh={mesh}>
          {color ? (
            <meshBasicMaterial wireframe color={color} />
          ) : (
            <meshBasicMaterial wireframe color="white" /> // will eventually just make it transparent
          )}
        </TrackedMesh>
      </RigidBody>
    </>
  );
}

export default React.memo(SpacialBox);
