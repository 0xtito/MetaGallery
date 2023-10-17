"use client";

import React, {
  useMemo,
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  useTrackedMeshes,
  useTrackedPlanes,
} from "@coconut-xr/natuerlich/react";
import { PlaneTypes, MeshesAndPlanesContextProps } from "@/utils/types";
import {
  DEFAULT_PLANE_STRUCTURE,
  DEFAULT_MESH_STRUCTURE,
} from "@/utils/constants";
import { set } from "lodash";

export const MeshesAndPlanesContext =
  createContext<MeshesAndPlanesContextProps>({
    // meshes: { ...DEFAULT_MESH_STRUCTURE },
    // planes: { ...DEFAULT_PLANE_STRUCTURE },
    meshes: {},
    planes: {},
    isLoading: true,
  });

export function MeshesAndPlanesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const trackedMeshes = useTrackedMeshes();
  const trackedPlanes = useTrackedPlanes();
  const [count, setCount] = useState(0);
  const [init, setInit] = useState(false);
  // const [data, setData] = useState({
  //   meshes: [DEFAULT_MESH_STRUCTURE],
  //   planes: DEFAULT_PLANE_STRUCTURE,
  //   isLoading: true,
  // });

  const [data, setData] = useState<MeshesAndPlanesContextProps>({
    meshes: {},
    planes: {},
    isLoading: true,
  });

  // const handleMeshesAndPlanes = useCallback(() => {
  //   let newPlanes: Record<PlaneTypes, XRPlane[]> =
  //     data.planes !== DEFAULT_PLANE_STRUCTURE
  //       ? data.planes
  //       : // : { ...DEFAULT_PLANE_STRUCTURE };
  //         ({} as Record<PlaneTypes, XRPlane[]>);

  //   let newMeshes: Record<PlaneTypes, XRMesh[]> =
  //     data.meshes !== DEFAULT_MESH_STRUCTURE
  //       ? data.meshes
  //       : // : { ...DEFAULT_MESH_STRUCTURE };
  //         ({} as Record<PlaneTypes, XRMesh[]>);

  //   if (trackedMeshes) {
  //     trackedMeshes.forEach((mesh) => {
  //       if (mesh.semanticLabel === "global mesh") return;
  //       const name = (mesh.semanticLabel as PlaneTypes) || "other";
  //       if (!newMeshes[name]) {
  //         newMeshes[name] = [];
  //       }
  //       newMeshes[name].push(mesh);
  //     });
  //   }

  //   if (trackedPlanes) {
  //     trackedPlanes.forEach((plane) => {
  //       const name = ((plane as any).semanticLabel as PlaneTypes) || "other";
  //       if (!newPlanes[name]) {
  //         newPlanes[name] = [];
  //       }
  //       newPlanes[name].push(plane);
  //     });
  //   }

  //   setData((prevData) => {
  //     // console.log({
  //     //   meshes: trackedMeshes ? newMeshes : prevData.meshes,
  //     //   planes: trackedPlanes ? newPlanes : prevData.planes,
  //     //   isLoading: !trackedMeshes || !trackedPlanes,
  //     // });
  //     return {
  //       meshes: trackedMeshes ? newMeshes : prevData.meshes,
  //       planes: trackedPlanes ? newPlanes : prevData.planes,
  //       isLoading: !trackedMeshes || !trackedPlanes,
  //     };
  //   });
  // }, [trackedMeshes, trackedPlanes, data]);

  // useEffect(() => {
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

    if (
      Object.keys(newMeshes).length > 0 &&
      Object.keys(newPlanes).length > 0
    ) {
      const meshLength = Object.keys(newMeshes).length;
      const planeLength = Object.keys(newPlanes).length;
      setData((prevData) => {
        console.log({
          meshes: trackedMeshes ? newMeshes : prevData.meshes,
          planes: trackedPlanes ? newPlanes : prevData.planes,
          isLoading: !(meshLength > 0 && planeLength > 0),
        });

        return {
          meshes: trackedMeshes ? newMeshes : prevData.meshes,
          planes: trackedPlanes ? newPlanes : prevData.planes,
          isLoading: !(meshLength > 0 && planeLength > 0),
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
    console.log("value changing");
    // console.log(data);
    // console.log({
    //   meshes: data.meshes,
    //   planes: data.planes,
    //   isLoading: data.isLoading,
    // });

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

// import React, { useMemo, createContext, useRef, useState } from "react";
// import {
//   useTrackedMeshes,
//   useTrackedPlanes,
// } from "@coconut-xr/natuerlich/react";
// // import { getMeshId, getPlaneId } from "@coconut-xr/natuerlich";

// import { PlaneTypes, MeshesAndPlanesContextProps } from "@/utils/types";

// import {
//   DEFAULT_PLANE_STRUCTURE,
//   DEFAULT_MESH_STRUCTURE,
// } from "@/utils/constants";

// type AcceptedMeshes =
//   | "desk"
//   | "couch"
//   | "floor"
//   | "ceiling"
//   | "wall"
//   | "door"
//   | "window"
//   | "other"
//   | string;

// export const MeshesAndPlanesContext =
//   createContext<MeshesAndPlanesContextProps>({
//     meshes: { ...DEFAULT_MESH_STRUCTURE },
//     planes: { ...DEFAULT_PLANE_STRUCTURE },
//   });

// export function MeshesAndPlanesProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const trackedMeshes = useTrackedMeshes();
//   const trackedPlanes = useTrackedPlanes();
//   const [data, setData] = useState({
//     meshes: DEFAULT_MESH_STRUCTURE,
//     planes: DEFAULT_PLANE_STRUCTURE,
//     isLoading: true,
//   });

//   const values = useMemo(() => {
//     const newPlanes = { ...DEFAULT_PLANE_STRUCTURE };
//     const newMeshes = { ...DEFAULT_MESH_STRUCTURE };

//     if (trackedMeshes) {
//       trackedMeshes.forEach((mesh) => {
//         if (mesh.semanticLabel === "global mesh") return;
//         const name = (mesh.semanticLabel as PlaneTypes) || "other";
//         if (!newMeshes[name]) {
//           newMeshes[name] = [];
//         }
//         console.log({ name, mesh });
//         try {
//           newMeshes[name].push(mesh);
//         } catch (error) {
//           console.log(error);
//           throw new Error(error as any);
//         }
//       });
//     }

//     if (trackedPlanes) {
//       trackedPlanes.forEach((plane) => {
//         const name = ((plane as any).semanticLabel as PlaneTypes) || "other";
//         console.log({ plane, name });
//         if (!newPlanes[name]) {
//           newPlanes[name] = [];
//         }

//         newPlanes[name].push(plane);
//       });
//     }

//     return {
//       meshes: newMeshes,
//       planes: newPlanes,
//     };
//   }, [trackedMeshes, trackedPlanes]);

//   return (
//     <MeshesAndPlanesContext.Provider value={values}>
//       {children}
//     </MeshesAndPlanesContext.Provider>
//   );
// }

// export default MeshesAndPlanesProvider;
