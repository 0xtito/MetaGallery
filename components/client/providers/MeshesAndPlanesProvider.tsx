"use client";

import React, { useMemo, createContext, useState, useCallback } from "react";
import {
  useTrackedMeshes,
  useTrackedPlanes,
} from "@coconut-xr/natuerlich/react";

import { PlaneTypes, MeshesAndPlanesContextProps } from "@/utils/types";

const MeshesAndPlanesContext = createContext<MeshesAndPlanesContextProps>({
  meshes: {},
  planes: {},
  isLoading: true,
});

export const useMeshesAndPlanesContext = (): MeshesAndPlanesContextProps => {
  const context = React.useContext(MeshesAndPlanesContext);
  if (!context) {
    throw new Error(
      "useMeshesAndPlanesContext must be used within a MeshesAndPlanesProvider"
    );
  }
  return context;
};

export function MeshesAndPlanesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const trackedMeshes = useTrackedMeshes();
  const trackedPlanes = useTrackedPlanes();

  const [data, setData] = useState<MeshesAndPlanesContextProps>({
    meshes: {},
    planes: {},
    isLoading: true,
  });

  const handleMeshesAndPlanes = useCallback(() => {
    let newPlanes: Record<PlaneTypes, XRPlane[]> = { ...data.planes };

    let newMeshes: Record<PlaneTypes, XRMesh[]> = { ...data.meshes };

    if (trackedMeshes && Object.keys(newMeshes).length === 0) {
      trackedMeshes.forEach((mesh) => {
        if (mesh.semanticLabel === "global mesh") return;
        const name = (mesh.semanticLabel as PlaneTypes) || "other";
        if (!newMeshes[name]) {
          newMeshes[name] = [];
        }
        newMeshes[name].push(mesh);
      });
    }

    if (trackedPlanes && Object.keys(newPlanes).length === 0) {
      trackedPlanes.forEach((plane) => {
        const name = ((plane as any).semanticLabel as PlaneTypes) || "other";
        if (!newPlanes[name]) {
          newPlanes[name] = [];
        }
        newPlanes[name].push(plane);
      });
    }

    const meshLength = Object.keys(newMeshes).length;
    const planeLength = Object.keys(newPlanes).length;

    if (meshLength > 0 && planeLength > 0) {
      setData((prevData) => {
        console.log({
          meshes: trackedMeshes ? newMeshes : prevData.meshes,
          planes: trackedPlanes ? newPlanes : prevData.planes,
          isLoading: false,
        });

        return {
          meshes: trackedMeshes ? newMeshes : prevData.meshes,
          planes: trackedPlanes ? newPlanes : prevData.planes,
          isLoading: false,
        };
      });
    }
  }, [trackedMeshes, trackedPlanes, data]);

  // useEffect(() => {
  //   if (!init) {
  //     // return;
  //     console.log(`not init yet`);
  //   } else {
  //     console.log("init");
  //     handleMeshesAndPlanes();
  //   }
  // }, [init, handleMeshesAndPlanes]);

  // useEffect(() => {
  //   let initTimeout: NodeJS.Timeout | undefined;

  //   console.log("after if (!init) {");
  //   if (!init) {
  //     initTimeout = setTimeout(() => {
  //       console.log("timeout over");
  //       setInit(true);
  //     }, 2000);
  //     // return;
  //   }
  //   return () => {
  //     clearTimeout(initTimeout as NodeJS.Timeout);
  //   };
  // }, [init]);

  const value = useMemo(() => {
    if (data.isLoading) {
      handleMeshesAndPlanes();
    }

    return {
      meshes: data.meshes,
      planes: data.planes,
      isLoading: data.isLoading,
    };
  }, [data, handleMeshesAndPlanes]);

  return (
    <MeshesAndPlanesContext.Provider value={value}>
      {children}
    </MeshesAndPlanesContext.Provider>
  );
}

export default MeshesAndPlanesProvider;
