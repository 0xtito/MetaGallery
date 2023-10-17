"use client";

import React, {
  useMemo,
  createContext,
  useRef,
  useContext,
  useEffect,
} from "react";
import {
  useTrackedMeshes,
  useTrackedPlanes,
} from "@coconut-xr/natuerlich/react";
// import { getMeshId, getPlaneId } from "@coconut-xr/natuerlich";
import * as _ from "lodash";

import { PlaneTypes, MeshesAndPlanesContextProps } from "@/utils/types";
import { LoadingRoomContext } from "./";

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
    meshes: { ...DEFAULT_MESH_STRUCTURE }, // missing types
    planes: { ...DEFAULT_PLANE_STRUCTURE }, // missing types
  });

export function MeshesAndPlanesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, setIsLoading } = useContext(LoadingRoomContext);

  const trackedMeshes = useTrackedMeshes();
  const trackedPlanes = useTrackedPlanes();
  const [trackedPlanesSet, setTrackedPlanesSet] =
    React.useState<boolean>(false);
  const [trackedMeshesSet, setTrackedMeshesSet] =
    React.useState<boolean>(false);

  // const meshesArr = useRef<Record<PlaneTypes, XRMesh[]>>({
  //   ...DEFAULT_MESH_STRUCTURE,
  // });
  // const planesArr = useRef<Record<PlaneTypes, XRPlane[]>>({
  //   ...DEFAULT_PLANE_STRUCTURE,
  // });
  const [meshesArr, setMeshesArr] = React.useState<
    Record<PlaneTypes, XRMesh[]>
  >({});
  const [planesArr, setPlanesArr] = React.useState<
    Record<PlaneTypes, XRPlane[]>
  >({});

  const values = useMemo(() => {
    // if (
    //   !_.isEqual(meshesArr.current, DEFAULT_MESH_STRUCTURE) &&
    //   !_.isEqual(planesArr.current, DEFAULT_PLANE_STRUCTURE)
    // ) {
    //   return {
    //     meshes: { ...meshesArr.current },
    //     planes: { ...planesArr.current },
    //   };
    // }
    // console.log("-----");
    // console.log(!_.isEqual(meshesArr.current, DEFAULT_MESH_STRUCTURE));
    // console.log(!_.isEqual(planesArr.current, DEFAULT_PLANE_STRUCTURE));

    // console.log(meshesArr.current);
    // console.log(planesArr.current);

    // console.log("-----");

    // console.log("in useMemo");
    // console.log({ trackedMeshes, trackedPlanes });
    // console.log({ trackedMeshesSet, trackedPlanesSet });

    const newMeshes = { ...meshesArr };
    const newPlanes = { ...planesArr };

    console.log({ track });

    console.log(Object.keys(newPlanes).length);
    console.log(Object.keys(newMeshes).length);

    // if (trackedMeshes && !trackedMeshesSet) {
    if (trackedMeshes && Object.keys(newMeshes).length === 0) {
      trackedMeshes.forEach((mesh) => {
        if (mesh.semanticLabel === "global mesh") return; // removing global mesh for now
        const name = (mesh.semanticLabel as PlaneTypes) || "other";
        if (!newMeshes[name]) {
          newMeshes[name] = [];
          // meshesArr[name] = [];
        }
        // console.log({ name, mesh });
        try {
          newMeshes[name].push(mesh);
        } catch (error) {
          console.log(error);
          throw new Error(error as any);
        }
      });
      // meshesArr.current = newMeshes;
      console.log("setting meshesArr to newMeshes: ", newMeshes);
      setMeshesArr(newMeshes);
      // setTrackedMeshesSet(true);

      // console.log(meshesArr.current);
      // console.log(newMeshes);
    }
    // if (trackedPlanes && !trackedPlanesSet) {
    if (trackedPlanes && Object.keys(newPlanes).length === 0) {
      trackedPlanes.forEach((plane) => {
        const name = ((plane as any).semanticLabel as PlaneTypes) || "other";
        // console.log({ plane, name });
        if (!newPlanes[name]) {
          newPlanes[name] = [];
        }
        try {
          newPlanes[name].push(plane);
        } catch (error) {
          console.log(error);
          throw new Error(error as any);
        }
      });
      console.log("setting planesArr to newPlanes: ");
      console.log(newPlanes);
      setPlanesArr(newPlanes);
      // setTrackedPlanesSet(true);
    }

    console.log("right before returning values");
    // console.log({ meshes: meshesArr.current, planes: planesArr.current });
    return {
      meshes: { ...meshesArr },
      planes: { ...planesArr },
    };
  }, [planesArr, meshesArr, trackedMeshes, trackedPlanes]);

  useEffect(() => {
    if (
      Object.keys(meshesArr).length > 0 &&
      Object.keys(planesArr).length > 0
    ) {
      console.log("meshes and planes are set");
      // console.log(meshesArr.current);
      // console.log(planesArr.current);
      setIsLoading(false);
    }
  }, [planesArr, meshesArr, setIsLoading]);

  return (
    <MeshesAndPlanesContext.Provider value={values}>
      {children}
    </MeshesAndPlanesContext.Provider>
  );
}

export default React.memo(MeshesAndPlanesProvider);
