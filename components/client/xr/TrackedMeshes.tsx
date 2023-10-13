"use client";

import React, { useEffect } from "react";
import { getMeshId } from "@coconut-xr/natuerlich";
import {
  TrackedMesh,
  useTrackedMeshes,
  useTrackedObjectMeshes,
  useTrackedPlanes,
  useTrackedObjectPlanes,
} from "@coconut-xr/natuerlich/react";

export function TrackedMeshes() {
  const meshes = useTrackedMeshes();
  const trackedWalls = useTrackedObjectMeshes("wall");
  const trackedDoors = useTrackedObjectMeshes("door");
  const trackedPlanes = useTrackedPlanes();
  const trackedWallsPlanes = useTrackedObjectPlanes("wall");
  const trackedDoorPlanes = useTrackedObjectPlanes("door");

  useEffect(() => {
    console.log({
      meshes,
      trackedWalls,
      trackedDoors,
      trackedPlanes,
      trackedWallsPlanes,
      trackedDoorPlanes,
    });

    const items = {
      meshes,
      trackedWalls,
      trackedDoors,
      trackedPlanes,
      trackedWallsPlanes,
      trackedDoorPlanes,
    };

    if (meshes && meshes.length > 0) {
      //   setTimeout(() => {
      //     console.log({
      //       meshes,
      //       trackedWalls,
      //       trackedDoors,
      //       trackedPlanes,
      //       trackedWallsPlanes,
      //       trackedDoorPlanes,
      //     });
      //   }, 3000);
    }
  }, [
    meshes,
    trackedWalls,
    trackedDoors,
    trackedPlanes,
    trackedWallsPlanes,
    trackedDoorPlanes,
  ]);

  return (
    <>
      {meshes?.map((mesh) => (
        <TrackedMesh mesh={mesh} key={getMeshId(mesh)}>
          <meshBasicMaterial wireframe color="red" />
        </TrackedMesh>
      ))}
    </>
  );
}
