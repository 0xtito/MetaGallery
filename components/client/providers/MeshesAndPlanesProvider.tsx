"use client";

import React, { useMemo, createContext, useRef } from "react";
import {
  useTrackedMeshes,
  useTrackedPlanes,
} from "@coconut-xr/natuerlich/react";
// import { getMeshId, getPlaneId } from "@coconut-xr/natuerlich";

import { PlaneTypes, MeshesAndPlanesContextProps } from "@/utils/types";

import {
  DEFAULT_PLANE_STRUCTURE,
  DEFAULT_MESH_STRUCTURE,
} from "@/utils/constants";

type AcceptedMeshes =
  | "desk"
  | "couch"
  | "floor"
  | "ceiling"
  | "wall"
  | "door"
  | "window"
  | "other"
  | string;

export const MeshesAndPlanesContext =
  createContext<MeshesAndPlanesContextProps>({
    meshes: { ...DEFAULT_MESH_STRUCTURE },
    planes: { ...DEFAULT_PLANE_STRUCTURE },
  });

export function MeshesAndPlanesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const trackedMeshes = useTrackedMeshes();
  const trackedPlanes = useTrackedPlanes();

  const values = useMemo(() => {
    const newPlanes = { ...DEFAULT_PLANE_STRUCTURE };
    const newMeshes = { ...DEFAULT_MESH_STRUCTURE };

    if (trackedMeshes) {
      trackedMeshes.forEach((mesh) => {
        if (mesh.semanticLabel === "global mesh") return;
        const name = (mesh.semanticLabel as PlaneTypes) || "other";
        if (!newMeshes[name]) {
          newMeshes[name] = [];
        }
        console.log({ name, mesh });
        try {
          newMeshes[name].push(mesh);
        } catch (error) {
          console.log(error);
          throw new Error(error as any);
        }
      });
    }

    if (trackedPlanes) {
      trackedPlanes.forEach((plane) => {
        const name = ((plane as any).semanticLabel as PlaneTypes) || "other";
        console.log({ plane, name });
        if (!newPlanes[name]) {
          newPlanes[name] = [];
        }

        newPlanes[name].push(plane);
      });
    }

    return {
      meshes: newMeshes,
      planes: newPlanes,
    };
  }, [trackedMeshes, trackedPlanes]);

  return (
    <MeshesAndPlanesContext.Provider value={values}>
      {children}
    </MeshesAndPlanesContext.Provider>
  );
}

export default MeshesAndPlanesProvider;
