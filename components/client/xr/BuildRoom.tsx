"use client";

import React from "react";
import { getMeshId, getPlaneId } from "@coconut-xr/natuerlich";

import {
  SpacialBox,
  SpacialPlane,
} from "@/components/client/xr/spacialObjects";
import { useMeshesAndPlanesContext } from "@/components/client/providers/MeshesAndPlanesProvider";
import { three_colors } from "@/utils/constants";

function BuildRoom() {
  const { meshes, planes, isLoading } = useMeshesAndPlanesContext();

  if ((!meshes || !planes) && !isLoading) {
    return null;
  }

  /**
   * Need to better test how planes and meshes from webXR are structured
   */

  return (
    <>
      {Object.entries(planes).map(([name, planes]) => {
        const colorsArr = Object.values(three_colors);
        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)];

        try {
          return (
            <group key={`plane_${name}`}>
              {planes.map((plane) => {
                return (
                  <SpacialPlane
                    name={name}
                    plane={plane}
                    key={getPlaneId(plane)}
                    color={color}
                  />
                );
              })}
            </group>
          );
        } catch (error) {
          console.log(`error in ${name} for planes in BuildRoom`);
          console.log(error);
          throw new Error(error as any);
        }
      })}
      {Object.entries(meshes).map(([name, meshes]) => {
        const colorsArr = Object.values(three_colors);
        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)];

        try {
          return (
            <group key={`mesh_${name}`}>
              {meshes.map((mesh) => {
                return (
                  <SpacialBox
                    name={name}
                    mesh={mesh}
                    key={`${getMeshId(mesh)}`}
                    color={color}
                  />
                );
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
