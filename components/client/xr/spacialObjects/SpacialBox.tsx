"use client";

import React, { useEffect, useRef } from "react";
import { TrackedMesh } from "@coconut-xr/natuerlich/react";
import { useBox } from "@react-three/cannon";
import { BoxGeometry, Mesh, WebGLRenderer } from "three";
// import { PlaneProps } from "@react-three/cannon";

import { useSharedGeometry } from "@/hooks/useSharedGeometry";
import {
  ConvexHullCollider,
  MeshCollider,
  RapierCollider,
  RapierRigidBody,
  RigidBody,
  RigidBodyProps,
  TrimeshCollider,
  vec3,
} from "@react-three/rapier";
// import { vec3 } from "@react-three/rapier";
import {
  BufferAttribute,
  BufferGeometry,
  NormalBufferAttributes,
  Vector3,
} from "three";
import { getMeshId } from "@coconut-xr/natuerlich";

interface SpacialBoxProps {
  mesh: XRMesh;
  mass?: number;
  color?: string;
}

function getCenterPointFromBufferAttribute(
  bufferAttribute: Float32Array
): Vector3 {
  const stride = 3; // since each vertex is represented by x, y, z values
  let sumX = 0,
    sumY = 0,
    sumZ = 0;
  const vertexCount = bufferAttribute.length / stride;

  for (let i = 0; i < bufferAttribute.length; i += stride) {
    sumX += bufferAttribute[i];
    sumY += bufferAttribute[i + 1];
    sumZ += bufferAttribute[i + 2];
  }

  return new Vector3(
    sumX / vertexCount,
    sumY / vertexCount,
    sumZ / vertexCount
  );
}

function SpacialBox(props: SpacialBoxProps) {
  const { mesh, color, mass = 1, ...restProps } = props;
  const ref = useRef<Mesh>(null);
  const rigidRef = useRef<RapierRigidBody>(null);
  const colliderRef = useRef<RapierCollider>(null);
  const geoRef = useRef<BufferGeometry<NormalBufferAttributes>>(null);
  const [isComplete, setIsComplete] = React.useState<boolean>(false);

  const handlePostRender = React.useCallback(
    (geometry: BufferGeometry<NormalBufferAttributes>) => {
      console.log("-------------------");
      // console.log("inside handleWallRender");
      console.log(`passed in geometry`, geometry);
      console.log(`ref.current`, ref.current);
      console.log("-------------------");

      // console.log("colliderRef.current", colliderRef.current);
      const newPosition = geometry.getAttribute("position");
      if (newPosition && !isComplete && ref.current) {
        // colliderRef.current?.
        geoRef.current?.setAttribute("position", newPosition);
        // ref.current.updateWorldMatrix(true, true);
        // ref.current?.updateMatrix();
        // geoRef.current?.u
        setIsComplete(true);
        // rigidRef.current?.setRotation();

        console.log("translation for rig: ", rigidRef.current?.translation());
      }
    },
    []
  );

  return (
    <>
      <RigidBody
        ref={rigidRef}
        colliders={"trimesh"}
        canSleep={false}
        type={"fixed"}
      >
        {/* <TrimeshCollider args={[props.mesh.vertices, props.mesh.indices]} /> */}
        <TrackedMesh
          ref={ref}
          mesh={props.mesh}
          // onAfterRender={(r, s, c, geometry) => {
          //   if (!isComplete) {
          //     handlePostRender(geometry);
          //   }
          // }}
        >
          <meshBasicMaterial color={color} />
        </TrackedMesh>
      </RigidBody>
    </>
  );
}

export default React.memo(SpacialBox);
