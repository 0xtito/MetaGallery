import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { XCameraRayIntersection } from "@coconut-xr/xinteraction";

export type PlaneTypes =
  | "desk"
  | "couch"
  | "floor"
  | "ceiling"
  | "wall"
  | "door"
  | "window"
  | "table"
  | "other"
  | string;

export interface MeshesAndPlanesContextProps {
  meshes: Record<PlaneTypes, XRMesh[]>;
  planes: Record<PlaneTypes, XRPlane[]>;
}

export interface LoadingContextProps {
  land?: GLTF;
  door?: GLTF;
  landTexture?: THREE.Texture;
  doorTexture?: THREE.Texture;
  loadingAlpha: number;
  item: string;
  loaded: number;
  total: number;
}

export type onIntersectionCallback =
  | ((id: number, intersections: readonly XCameraRayIntersection[]) => void)
  | undefined;
