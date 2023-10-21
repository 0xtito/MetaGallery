import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { XCameraRayIntersection } from "@coconut-xr/xinteraction";
import type { ThreeEvent } from "@react-three/fiber";
import type {
  Vector3,
  Quaternion,
  Mesh,
  BufferGeometry,
  NormalBufferAttributes,
  Material,
  Object3DEventMap,
} from "three";
import type { ButtonState } from "@coconut-xr/natuerlich/react";
import type { RapierRigidBody } from "@react-three/rapier";

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
  isAnchorable?: boolean;
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

export type GamepadButtonState = {
  pressed: boolean;
  touched: boolean;
  value: number;
};

interface GamepadBase {
  axes: readonly number[];
  buttons: {
    [key: string]: "pressed" | "touched" | "default";
  };
}

interface LeftGamepad extends GamepadBase {
  buttons: {
    "x-button": ButtonState;
    "y-button": ButtonState;
  };
}

interface RightGamepad extends GamepadBase {
  buttons: {
    "a-button": ButtonState;
    "b-button": ButtonState;
  };
}

interface ControllerState {
  visible: boolean;
  position: Vector3;
  orientation: Quaternion;
  gamepad: LeftGamepad | RightGamepad;
}

export interface LeftControllerState extends ControllerState {
  gamepad: LeftGamepad;
}

export interface RightControllerState extends ControllerState {
  gamepad: RightGamepad;
}

export type TriggerState = ButtonState | "NOT_SET";

export type PointerState = {
  z: number;
  state: TriggerState;
  heldObject: { uuid: string; name?: string } | null;
  controllerState?: ControllerState | null;
};

export type Pointers = {
  left: PointerState;
  right: PointerState;
};

export type ControllerStateContextValue = {
  pointers: Pointers;
  leftController: LeftControllerState | null;
  rightController: RightControllerState | null;
  setLeftPointer: (data: PointerState) => void;
  setRightPointer: (data: PointerState) => void;
};

export type useTrackControllersReturn = [
  LeftControllerState | null,
  RightControllerState | null
];

export interface RigidAndMeshRefs {
  rigidRef: React.RefObject<RapierRigidBody>;
  ref: React.RefObject<
    Mesh<
      BufferGeometry<NormalBufferAttributes>,
      Material | Material[],
      Object3DEventMap
    >
  >;
}
