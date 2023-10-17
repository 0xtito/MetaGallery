"use client";
import { XRPlanes } from "three/examples/jsm/webxr/XRPlanes.js";
import React, { useEffect, useContext, Suspense, useState } from "react";
import {
  TrackedPlane,
  TrackedMesh,
  useTrackedMeshes,
  useTrackedPlanes,
} from "@coconut-xr/natuerlich/react";
import { getMeshId, getPlaneId } from "@coconut-xr/natuerlich";
import { MeshesAndPlanesContext, LoadingRoomContext } from "../providers";
import * as THREE from "three";
import {
  SpacialBox,
  SpacialPlane,
} from "@/components/client/xr/spacialObjects";

import {
  DEFAULT_MESH_STRUCTURE,
  DEFAULT_PLANE_STRUCTURE,
} from "@/utils/constants";

import { three_colors } from "@/utils/constants";
import { useThree } from "@react-three/fiber";
// import { usePlane } from "@react-three/cannon";

function BuildRoom() {
  // const three = useThree();

  // three.xr.connect();
  const { meshes, planes, isLoading } = useContext(MeshesAndPlanesContext);
  // const { isLoading } = useContext(LoadingRoomContext);
  const [isPlanesSet, setIsPlanesSet] = React.useState<boolean>(false);
  const [isMeshSet, setIsMeshSet] = React.useState<boolean>(false);

  // if (isLoading) {
  //   return null;
  // }

  // console.log("RERENDER");

  if ((!meshes || !planes) && !isLoading) {
    return null;
  } else {
    // console.log("loaded in BuildRoom");
    // console.log({ meshes, planes });
  }
  // return null;
  // console.log({ meshes, planes });

  return (
    <>
      {/* <pointLight position={[0, 1, 0]} intensity={10} /> */}
      {Object.entries(planes).map(([name, planes], index) => {
        const colorsArr = Object.values(three_colors);
        if (index === 0) console.log(planes);
        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)];

        // console.log("plane name: ", name);

        try {
          return (
            <Suspense fallback={null}>
              <>
                {/* {isPlanesSet && ( */}
                <group key={`${name}+plane`}>
                  {planes.map((plane) => {
                    // console.log({ plane, planeId: getPlaneId(plane) });

                    return <></>;
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
                {/*  )} */}
              </>
            </Suspense>
          );
        } catch (error) {
          console.log(`error in ${name} for planes in BuildRoom`);
          console.log(error);
          throw new Error(error as any);
        }
      })}
      {Object.entries(meshes).map(([name, meshes], index) => {
        // a random color in hex for each type of mesh
        // select a random color form an object of colors
        if (index === 0) console.log(meshes);

        const colorsArr = Object.values(three_colors);

        const color = colorsArr[Math.floor(Math.random() * colorsArr.length)];

        // console.log("mesh name: ", name);

        try {
          return (
            <group key={`${name}+mesh`}>
              {meshes.map((mesh) => {
                // console.log({ mesh, meshId: getMeshId(mesh) });

                return (
                  <SpacialBox
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

// export default BuildRoom;
