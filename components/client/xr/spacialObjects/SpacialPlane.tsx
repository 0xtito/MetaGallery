"use client";

import React, { useEffect, useContext, useRef } from "react";
import { TrackedPlane, TrackedMesh } from "@coconut-xr/natuerlich/react";
// import type { TrackedMesh } from "@coconut-xr/natuerlich/react";
import { usePlane, PlaneProps } from "@react-three/cannon";
import type { Mesh } from "three";

import { useSharedGeometry } from "@/hooks/useSharedGeometry";
import { PlanePhysics } from "../physics/PhysicsObjects";

// interface SpacialPlaneProps {

// }

interface SpacialPlaneProps extends PlaneProps {
  plane: XRPlane;
  type: "Dynamic" | "Static" | "Kinematic";
  name: string;
  orientation?: "horizontal" | "vertical";
  mass?: number;
  color?: string;
}

// const _SpacialPlane = function (props: SpacialPlaneProps, ref: any) {

function SpacialPlane(props: SpacialPlaneProps) {
  const { plane, color, mass = 1, name, orientation, ...restProps } = props;
  const geometry = useSharedGeometry(plane, "plane");
  const ref = useRef<Mesh>(null);

  // const [physicsRef] = usePlane(() => ({ ...restProps, geometry }), ref);
  const material = props.color ? (
    <meshPhongMaterial color={props.color} />
  ) : (
    <meshPhongMaterial wireframe transparent />
  );

  return (
    <TrackedPlane ref={ref} plane={props.plane}>
      <PlanePhysics ref={ref} orientation={orientation} />
    </TrackedPlane>
  );

  // return (
  //   // <mesh ref={planeRef}>
  //   // {material}
  //   <TrackedPlane ref={ref} plane={props.plane}>
  //     <mesh ref={physicsRef} geometry={ref.current}>
  //       {material}
  //     </mesh>
  //     {/* Using wireframe for testing */}
  //   </TrackedPlane>
  //   // </mesh>
  // );
}
export default React.memo(SpacialPlane);
// export default React.memo(React.forwardRef(SpacialPlane));
// export const SpacialPlane = React.memo(React.forwardRef(_SpacialPlane));
// export const SpacialPlane = React.memo(_SpacialPlane);
// export const SpacialPlane = React.forwardRef(_SpacialPlane);
