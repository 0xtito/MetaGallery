import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { XCameraRayIntersection } from "@coconut-xr/xinteraction";
import type { ThreeEvent } from "@react-three/fiber";
import type { Vector3 } from "three";
import type { ButtonState } from "@coconut-xr/natuerlich/react";

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
  meshes: Record<PlaneTypes, XRMesh[]> | {};
  planes: Record<PlaneTypes, XRPlane[]> | {};
  isLoading: boolean;
}

export interface LoadingAssetsContextProps {
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

export interface SpacialPlaneProps {
  plane: XRPlane;
  name: string;
  mass?: number;
  color?: string;
}

export interface SpacialBoxProps {
  mesh: XRMesh;
  name: string;
  color?: string;
  mass?: number;
}
export interface GrabProps {
  children: React.ReactNode;
  handleGrab: (e: ThreeEvent<PointerEvent>) => void;
  handleRelease: (e: ThreeEvent<PointerEvent>, velocity?: Vector3) => void;
  name?: string;
}

export interface nfts {
  title: string;
  url: string;
  id: string;
  additionalInfo?: string;
}

export interface chunkedNfts {
  nfts: nfts[];
  id: string;
}

export type ButtonsType = "a-button" | "b-button" | "x-button" | "y-button";

export interface ControllerReaderState {
  thumbstickX: number;
  thumbstickY: number;
  thumbstickState: ButtonState | undefined;
  buttonsState: ButtonsObjType;
}

export type ButtonsObjType = Record<ButtonsType, ButtonState>;

export type ControllerReaderReturn = [ControllerReaderState, XRHandedness];
