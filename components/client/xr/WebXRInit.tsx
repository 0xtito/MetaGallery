"use client";

import {
  XRCanvas,
  Controllers,
  Grabbable,
  Hands,
} from "@coconut-xr/natuerlich/defaults";
import {
  RootContainer,
  Image,
  Text,
  Container,
  DefaultStyleProvider,
} from "@coconut-xr/koestlich";
import {
  useEnterXR,
  NonImmersiveCamera,
  ImmersiveSessionOrigin,
  usePersistedAnchor,
  SpaceGroup,
  useNativeFramebufferScaling,
  useHeighestAvailableFrameRate,
} from "@coconut-xr/natuerlich/react";
import { Quaternion } from "three";

const sessionOptions: XRSessionInit = {
  // requiredFeatures: ["local-floor", "hand-tracking", "anchors"],
  requiredFeatures: ["local-floor"],
};

function WebXRInit() {
  const [anchor, createAnchor] = usePersistedAnchor("test-anchor");
  const enterAR = useEnterXR("immersive-ar", sessionOptions);
  const enterVR = useEnterXR("immersive-vr", sessionOptions);

  const frameBufferScaling = useNativeFramebufferScaling();
  const frameRate = useHeighestAvailableFrameRate();

  return (
    <>
      <XRCanvas>
        {/* <color args={[0]} attach="background" /> */}
        <directionalLight position={[1, 1, 2]} />
        <NonImmersiveCamera position={[0, 1.5, -0.1]} />
        <Grabbable position={[0, 1.5, -0.5]}>
          <mesh>
            <boxGeometry />
            <meshBasicMaterial color="red" />
          </mesh>
        </Grabbable>
        <ImmersiveSessionOrigin>
          {anchor != null && (
            <SpaceGroup space={anchor.anchorSpace}>
              <mesh scale={0.1}>
                <boxGeometry />
                <meshBasicMaterial color="red" />
              </mesh>
            </SpaceGroup>
          )}
          <Hands />
          <Controllers />

          {/* <Hands
            type="grab"
            onPointerDownMissed={(e) => createAnchor(e.point, new Quaternion())}
          />
          <Controllers
            type="grab"
            onPointerDownMissed={(e) => createAnchor(e.point, new Quaternion())}
          /> */}
        </ImmersiveSessionOrigin>
      </XRCanvas>
      <button
        className="p-4 absolute top-4 left-4 bg-black rounded-md shadow-md text-white"
        onClick={() => {
          console.log("hey");
          enterAR().then(() => {
            console.log("entered");
          });
        }}
      >
        AR
      </button>
      <button
        className="p-4 absolute top-20 left-4 bg-black rounded-md shadow-md text-white "
        onClick={() => {
          console.log("hey");
          enterVR().then(() => {
            console.log("entered");
          });
        }}
      >
        VR
      </button>
    </>
  );
}

export default WebXRInit;
