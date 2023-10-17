"use client";

import {
  XRCanvas,
  Controllers,
  Grabbable,
  Hands,
} from "@coconut-xr/natuerlich/defaults";

import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
  useHeighestAvailableFrameRate,
} from "@coconut-xr/natuerlich/react";
// import { Physics, Debug } from "@react-three/cannon";
import { Physics, RigidBody } from "@react-three/rapier";
import { useState } from "react";
import { onIntersectionCallback } from "@/utils/types";
import { TrackedMeshes } from "@/components/client/xr";
import BuildRoom from "./BuildRoom";
import { LoadingRoomProvider, MeshesAndPlanesProvider } from "../providers";
import TestBox from "./testObjects/TestBox";

const sessionOptions: XRSessionInit = {
  // requiredFeatures: ["local-floor", "hand-tracking", "anchors"],
  requiredFeatures: [
    "local-floor",
    // "unbounded", // both local-bounded and unbounded do not work on quest 3
    "hit-test",
    "mesh-detection",
    "plane-detection",
  ],
};

function WebXRInit() {
  // const [anchor, createAnchor] = usePersistedAnchor("test-anchor");
  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const [startXR, setStartXR] = useState<boolean>(false);
  // const enterVR = useEnterXR("immersive-vr", sessionOptions);

  // const meshes = useTrackedMeshes();

  // const frameBufferScaling = useNativeFramebufferScaling();
  const frameRate = useHeighestAvailableFrameRate();

  const stopObject: onIntersectionCallback = (id, intersections) => {
    console.log("item crossing!");
    console.log({
      id,
      intersections,
    });
  };

  return (
    <>
      <XRCanvas onIntersections={stopObject} frameRate={frameRate}>
        {/* <LoadingRoomProvider> */}
        <NonImmersiveCamera position={[0, 1.5, -0.1]} />

        <Physics colliders={false} gravity={[0, 0.01, 0]} debug>
          <TestBox color="blue" position={[0.1, 1, -0.3]} />

          <TestBox position={[-0.1, 1, -0.3]} />

          <ImmersiveSessionOrigin>
            {startXR && (
              <MeshesAndPlanesProvider>
                <BuildRoom />
              </MeshesAndPlanesProvider>
            )}
            <Hands type="grab" />
            <Controllers type="grab" />
          </ImmersiveSessionOrigin>
        </Physics>
      </XRCanvas>
      <button
        className="p-4 absolute top-4 left-4 bg-black rounded-md shadow-md text-white"
        onClick={() => {
          console.log("hey");
          enterAR().then(() => {
            console.log("entered");
            setStartXR(true);
          });
        }}
      >
        AR
      </button>
      {/* <button
        className="p-4 absolute top-20 left-4 bg-black rounded-md shadow-md text-white "
        onClick={() => {
          console.log("hey");
          enterVR().then(() => {
            console.log("entered");
          });
        }}
      >
        VR
      </button> */}
    </>
  );
}

export default WebXRInit;
