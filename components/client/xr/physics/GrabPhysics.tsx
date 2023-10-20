"use client";

import React, { forwardRef, useRef, MutableRefObject, useMemo } from "react";
import { Vector3, Mesh } from "three";
import { isXIntersection } from "@coconut-xr/xinteraction";
import { vec3 } from "@react-three/rapier";

import { useControllerStateContext } from "@/components/client/providers/ControllerStateProvider";

import type { ThreeEvent } from "@react-three/fiber";
import type { RapierRigidBody } from "@react-three/rapier";
import { RigidAndMeshRefs, GrabProps } from "@/utils/types";

const GrabPhysics = forwardRef<RigidAndMeshRefs, GrabProps>(
  ({ children, handleGrab, handleRelease, name }, rigidAndMeshRef) => {
    const downState = useRef<{
      pointerId: number;
      pointToObjectOffset: Vector3;
      zPosition: number;
      positions: Vector3[];
      timestamps: number[];
    }>();

    const rigidRef = useMemo(
      () =>
        // @ts-expect-error
        rigidAndMeshRef!.current?.rigidRef as MutableRefObject<RapierRigidBody>,
      [rigidAndMeshRef]
    );

    const meshRef = useMemo(
      // @ts-expect-error
      () => rigidAndMeshRef!.current?.ref as MutableRefObject<Mesh>,
      [rigidAndMeshRef]
    );

    const maxEntries = useMemo(() => 5, []);
    const { pointers, leftController, rightController } =
      useControllerStateContext();

    const adjustPositionByThumbstick = (
      handness: "left" | "right",
      e: ThreeEvent<PointerEvent>
    ) => {
      if (!rigidRef?.current) return;

      const currentPointerState = pointers[handness];

      const controllerPosition =
        handness == "left"
          ? leftController?.position
          : rightController?.position;

      if (controllerPosition) {
        const rayDirection = new Vector3()
          .subVectors(e.point, controllerPosition)
          .normalize();
        console.log("rayDirection", rayDirection);
        const offset = currentPointerState.z;

        const adjustedPosition = new Vector3().addVectors(
          controllerPosition,
          rayDirection.multiplyScalar(-offset)
        );

        rigidRef.current.setTranslation(vec3(adjustedPosition), true);
      }
    };

    return (
      <mesh
        name={name ?? ""}
        ref={meshRef}
        onPointerDown={(e) => {
          if (
            meshRef.current != null &&
            downState.current == null &&
            isXIntersection(e)
          ) {
            e.stopPropagation();
            (e.target as HTMLElement).setPointerCapture(e.pointerId);

            downState.current = {
              pointerId: e.pointerId,
              pointToObjectOffset: meshRef.current.position
                .clone()
                .sub(e.point),
              zPosition: e.point.z,
              positions: [],
              timestamps: [],
            };
            handleGrab(e);
          }
        }}
        onPointerUp={(e) => {
          if (downState.current?.pointerId != e.pointerId) {
            return;
          }
          if (downState.current.positions.length > 1) {
            const lastIndex = downState.current.positions.length - 1;
            const deltaTime =
              (downState.current.timestamps[lastIndex] -
                downState.current.timestamps[0]) /
              1000;
            const deltaPosition = downState.current.positions[lastIndex]
              .clone()
              .sub(downState.current.positions[0]);
            const velocity = deltaPosition.divideScalar(deltaTime);

            downState.current = undefined;

            handleRelease(e, velocity);
          }
        }}
        onPointerMove={(e) => {
          if (
            meshRef.current == null ||
            downState.current == null ||
            // e.pointerId != downState.current.pointerId ||
            !isXIntersection(e)
          ) {
            return;
          }
          let handness: "left" | "right" | undefined;

          if (pointers.left.heldObject?.uuid == meshRef.current.uuid) {
            handness = "left";
          } else if (pointers.right.heldObject?.uuid == meshRef.current.uuid) {
            handness = "right";
          }

          const timeStamp = new Date().getTime();
          downState.current.positions.push(e.point);
          downState.current.timestamps.push(timeStamp);

          if (downState.current.positions.length > maxEntries) {
            downState.current.positions.shift();
            downState.current.timestamps.shift();
          }

          if (handness) {
            adjustPositionByThumbstick(handness, e);
          }
        }}
      >
        {children}
      </mesh>
    );
  }
);

export default React.memo(GrabPhysics);
