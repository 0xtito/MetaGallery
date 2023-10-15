"use client";

import React, { useEffect, useRef } from "react";
import { TrackedMesh } from "@coconut-xr/natuerlich/react";
import { useBox } from "@react-three/cannon";
import type { Mesh } from "three";
// import { PlaneProps } from "@react-three/cannon";

import { useSharedGeometry } from "@/hooks/useSharedGeometry";

interface SpacialBoxProps {
  mesh: XRMesh;
  type: "Dynamic" | "Static" | "Kinematic";
  mass?: number;
  color?: string;
}

// interface SpacialMeshProps extends MeshProps {
//   mesh: XRMesh;
//   color?: string;
// }

function SpacialBox(props: SpacialBoxProps) {
  const { mesh, color, mass = 1, ...restProps } = props;
  const geometry = useSharedGeometry(mesh, "mesh");

  const [ref, { at }] = useBox(
    () => ({ mass, ...restProps, geometry }),
    useRef<Mesh>(null)
  );

  const material = props.color ? (
    <meshBasicMaterial color={props.color} />
  ) : (
    <meshBasicMaterial wireframe transparent />
  );
  return (
    <>
      <mesh ref={ref}>
        {material}
        <TrackedMesh mesh={props.mesh}>
          {material}
          {/* {props.color ? (
            <meshBasicMaterial color={props.color} />
          ) : (
            <meshBasicMaterial wireframe transparent />
          )} */}
        </TrackedMesh>
      </mesh>
    </>
  );
}

export default React.memo(SpacialBox);
// export const SpacialBox = React.memo(_SpacialBox);
// export const SpacialBox = React.forwardRef(React.memo(_SpacialBox));
// export const SpacialBox = React.forwardRef(_SpacialBox);
