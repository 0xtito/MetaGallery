"use client";

import { XRCanvas, Controllers, Hands } from "@coconut-xr/natuerlich/defaults";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
  useHeighestAvailableFrameRate,
} from "@coconut-xr/natuerlich/react";
import { Physics } from "@react-three/rapier";
import { useState } from "react";
import BuildRoom from "./BuildRoom";
import { MeshesAndPlanesProvider } from "../providers";
import TestBox from "./testObjects/TestBox";

const sessionOptions: XRSessionInit = {
  requiredFeatures: [
    "local-floor",
    "hit-test",
    "mesh-detection",
    "plane-detection",
  ],
};

function WebXRInit() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const [startXR, setStartXR] = useState<boolean>(false);

  // const frameBufferScaling = useNativeFramebufferScaling();
  const frameRate = useHeighestAvailableFrameRate();

  return (
    <>
      <XRCanvas frameRate={frameRate}>
        <NonImmersiveCamera position={[0, 1.5, -0.1]} />

        <Physics colliders={false} gravity={[0, -0.02, 0]} debug>
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
    </>
  );
}

export default WebXRInit;
