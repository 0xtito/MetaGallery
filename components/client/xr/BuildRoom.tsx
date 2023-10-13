"use client";

import React, { useEffect, useContext } from "react";
import {
  TrackedPlane,
  TrackedMesh,
  useTrackedMeshes,
  useTrackedPlanes,
} from "@coconut-xr/natuerlich/react";
import { getMeshId, getPlaneId } from "@coconut-xr/natuerlich";
import { MeshesAndPlanesContext } from "../providers";
import * as THREE from "three";

import { three_colors } from "@/utils/constants";

function BuildRoom() {
  const { meshes, planes } = useContext(MeshesAndPlanesContext);
  //   console.log({ meshes, planes });

  //   const planes = useTrackedPlanes();
  //   const meshes = useTrackedMeshes();

  return (
    <>
      <pointLight position={[0, 1, 0]} intensity={10} />
      {Object.entries(planes).map(([name, planes]) => {
        const colorsArr = Object.values(three_colors);

        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)];

        return (
          <group key={name}>
            {planes.map((plane) => {
              return (
                <TrackedPlane plane={plane} key={getPlaneId(plane)}>
                  <meshPhongMaterial wireframe color={color} />
                  {/* <meshBasicMaterial color={color} /> */}
                </TrackedPlane>
              );
            })}
          </group>
        );
      })}
      {Object.entries(meshes).map(([name, meshes]) => {
        // a random color in hex for each type of mesh
        // select a random color form an object of colors
        const colorsArr = Object.values(three_colors);

        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)];

        console.log(color);

        return (
          <group key={name}>
            {meshes.map((mesh) => (
              <TrackedMesh mesh={mesh} key={getMeshId(mesh)}>
                <meshBasicMaterial color={color} />
              </TrackedMesh>
            ))}
          </group>
        );
      })}
    </>
  );
}

// return (
//     <>
//       {planes!.map((plane) => (
//         <TrackedPlane plane={plane} key={getPlaneId(plane)}>
//           <meshPhongMaterial color="gray" />
//         </TrackedPlane>
//       ))}
//       {meshes!.map((mesh) => (
//         <TrackedMesh mesh={mesh} key={getMeshId(mesh)}>
//           <meshPhongMaterial color="purple" />
//         </TrackedMesh>
//       ))}
//     </>
//   );

export default React.memo(BuildRoom);
