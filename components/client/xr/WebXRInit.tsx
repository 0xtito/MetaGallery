"use client";

import { useState } from "react";
import { XRCanvas, Hands } from "@coconut-xr/natuerlich/defaults";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
  useHeighestAvailableFrameRate,
  useNativeFramebufferScaling,
  useInputSources,
} from "@coconut-xr/natuerlich/react";
import { clippingEvents } from "@coconut-xr/koestlich";
import { getInputSourceId } from "@coconut-xr/natuerlich";
import { Physics } from "@react-three/rapier";

import BuildRoom from "@/components/client/xr/BuildRoom";
import {
  MeshesAndPlanesProvider,
  ControllerStateProvider,
} from "@/components/client/providers";
import {
  AdjustablePointerController,
  TestBox,
} from "@/components/client/xr/objects";
import { Dashboard } from "@/components/client/xr/interface";
import ActiveNftsProvider from "../providers/ActiveNftsProvider";
import ActiveNftObjects from "./objects/ActiveNftObjects";
import MetaBall from "./objects/MetaBall";

const sessionOptions: XRSessionInit = {
  requiredFeatures: [
    "local-floor",
    "hit-test",
    "mesh-detection",
    "plane-detection",
    "anchors",
  ],
};

function WebXRInit() {
  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const [startXR, setStartXR] = useState<boolean>(false);
  // should fetch users nfts in their wallet, and then only when they are loaded
  // in, display nft Objects
  const inputSources = useInputSources();

  const frameBufferScaling = useNativeFramebufferScaling();
  const frameRate = useHeighestAvailableFrameRate();

  return (
    <>
      <XRCanvas
        framerate={frameRate}
        framebufferscaling={frameBufferScaling}
        dpr={1}
        // @ts-expect-error
        events={clippingEvents}
        gl={{ localClippingEnabled: true }}
      >
        <NonImmersiveCamera position={[-0.5, 1.5, -0.4]} />

        <ControllerStateProvider>
          <Physics
            colliders={false}
            gravity={[0, -5, 0]}
            interpolate={false}
            timeStep={"vary"}
            // debug
          >
            <ActiveNftsProvider>
              {startXR && (
                <>
                  <Dashboard />
                  <ActiveNftObjects />
                </>
              )}
            </ActiveNftsProvider>

            {/* Putting this here so the blocks only load in once the user starts AR */}
            {startXR && (
              <>
                <TestBox color="blue" position={[0.1, 1, -0.3]} />

                <TestBox position={[-0.1, 1, -0.3]} />

                <MetaBall position={[0, 2, -0.3]} />
              </>
            )}

            <ImmersiveSessionOrigin>
              {startXR && (
                <MeshesAndPlanesProvider>
                  <BuildRoom />
                </MeshesAndPlanesProvider>
              )}

              <Hands type="grab" />

              {inputSources.map((inputSource, index) => (
                <AdjustablePointerController
                  id={getInputSourceId(inputSource)}
                  key={getInputSourceId(inputSource)}
                  inputSource={inputSource}
                />
              ))}
            </ImmersiveSessionOrigin>
          </Physics>
        </ControllerStateProvider>
      </XRCanvas>
      <button
        className="p-4 absolute top-4 left-4 bg-white rounded-md shadow-md text-black"
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
