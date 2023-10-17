"use client";
/* eslint-disable  */
import { PlaneProps, usePlane } from "@react-three/cannon";
import { Mesh } from "three";
import { ForwardedRef, forwardRef, MutableRefObject } from "react";
import { MeshPhongMaterial, MeshPhongMaterialParameters } from "three";

interface PlanePhysicsProps extends PlaneProps {
  orientation?: "horizontal" | "vertical";
}

interface BoxPhysicsProps {}

export const PlanePhysics = forwardRef(
  (
    { orientation = "vertical", ...props }: PlanePhysicsProps,
    ref: ForwardedRef<Mesh>
  ) => {
    console.log(
      `ref fom SpacialPlane`,
      (ref as MutableRefObject<Mesh>).current
    );

    const planeGeometry = (ref as MutableRefObject<Mesh>).current?.geometry;
    const [planeRef, api] = usePlane(() => ({ ...props }), ref);

    console.log(`ref from planeRef`, planeRef.current);

    return (
      <mesh
        ref={planeRef}
        geometry={planeGeometry}
        rotation={
          orientation === "horizontal" ? [Math.PI / 2, 0, 0] : [0, 0, 0]
        }
      >
        {/* <planeGeometry  /> */}
        <meshPhongMaterial wireframe transparent />
      </mesh>
    );
  }
);

// export const PlanePhysics = forwardRef(
//   ({ orientation = "vertical", ...props }: PlanePhysicsProps, ref) => {
//     // const { orientation = "vertical", ...restProps } = props;
//     console.log(ref!.current);

//     const t = ref!.current.geometry;
//     const [planeRef, api] = usePlane(() => ({ restProps }), ref);
//     return (
//       <mesh ref={planeRef} geometry={ref.current.geometry}>
//         <planeGeometry />
//         <meshPhongMaterial wireframe transparent />
//       </mesh>
//     );
//   }
// );

export const BoxPhysics = forwardRef((props, ref) => {
  return (
    <mesh>
      <></>
    </mesh>
  );
});
