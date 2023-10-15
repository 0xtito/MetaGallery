"use client";

import React, { useEffect, useContext, Suspense } from "react";
import {
  TrackedPlane,
  TrackedMesh,
  useTrackedMeshes,
  useTrackedPlanes,
} from "@coconut-xr/natuerlich/react";
import { getMeshId, getPlaneId } from "@coconut-xr/natuerlich";
import { MeshesAndPlanesContext } from "../providers";
import * as THREE from "three";
import {
  SpacialBox,
  SpacialPlane,
} from "@/components/client/xr/spacialObjects";

import { three_colors } from "@/utils/constants";
import { usePlane } from "@react-three/cannon";

function BuildRoom() {
  const { meshes, planes } = useContext(MeshesAndPlanesContext);
  const [isPlanesSet, setIsPlanesSet] = React.useState<boolean>(false);

  console.log({ planes, meshes });

  useEffect(() => {
    if (planes && !isPlanesSet) {
      setIsPlanesSet(true);
    }
  }, [planes, isPlanesSet]);

  return (
    <>
      <pointLight position={[0, 1, 0]} intensity={10} />
      {Object.entries(planes).map(([name, planes]) => {
        const colorsArr = Object.values(three_colors);

        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)];

        try {
          return (
            <Suspense fallback={null}>
              <group key={`${name}+plane`}>
                {planes.map((plane) => {
                  return (
                    <SpacialPlane
                      type="Static"
                      name={name}
                      plane={plane}
                      orientation={plane.orientation}
                      key={getPlaneId(plane)}
                      color={color}
                    />
                  );
                  // return (
                  //   <TrackedPlane plane={plane} key={getPlaneId(plane)}>
                  //     <meshPhongMaterial wireframe color={color} />
                  //     {/* <meshBasicMaterial color={color} /> */}
                  //   </TrackedPlane>
                  // );
                })}
              </group>
            </Suspense>
          );
        } catch (error) {
          console.log(`error in ${name} for planes in BuildRoom`);
          console.log(error);
          throw new Error(error as any);
        }
      })}
      {Object.entries(meshes).map(([name, meshes]) => {
        // a random color in hex for each type of mesh
        // select a random color form an object of colors
        const colorsArr = Object.values(three_colors);

        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)];

        try {
          return (
            <group key={`${name}+mesh`}>
              {meshes.map((mesh) => {
                console.log({ mesh, meshId: getMeshId(mesh) });

                // const color = new THREE.Color();

                // color.set(colorValue).convertSRGBToLinear().toArray();

                return (
                  <SpacialBox
                    type="Static"
                    mesh={mesh}
                    key={getMeshId(mesh)}
                    color={color}
                  />
                );

                // return (
                //   <TrackedMesh mesh={mesh} key={getMeshId(mesh)}>
                //     <meshBasicMaterial color={color} />
                //   </TrackedMesh>
                // );
              })}
            </group>
          );
        } catch (error) {
          console.log(`error in ${name} for meshes in BuildRoom`);
          console.log(error);
          throw new Error(error as any);
        }
      })}
    </>
  );
}

export default React.memo(BuildRoom);
