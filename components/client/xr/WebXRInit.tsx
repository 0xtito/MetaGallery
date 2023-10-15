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
import { Physics, Debug } from "@react-three/cannon";

import { onIntersectionCallback } from "@/utils/types";
import { TrackedMeshes } from "@/components/client/xr";
import BuildRoom from "./BuildRoom";
import { MeshesAndPlanesProvider } from "../providers";
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
        <MeshesAndPlanesProvider>
          <NonImmersiveCamera position={[0, 1.5, -0.1]} />

          <Physics gravity={[0, 0.01, 0]}>
            {/* <Debug color="black" scale={1.1}> */}
            {/* <Grabbable> */}
            <TestBox />
            {/* </Grabbable> */}
            {/* <Grabbable> */}
            <TestBox position={[0, 2, 2]} />
            {/* </Grabbable> */}

            {/* <Grabbable position={[-0.5, 1, 0.5]}>
              <mesh position={[-0.5, 1, 0.5]}>
                <RoundedBox
                  args={[0.2, 0.2, 1]} // Width, height, depth. Default is [1, 1, 1]
                  radius={0.05} // Radius of the rounded corners. Default is 0.05
                  smoothness={4} // The number of curve segments. Default is 4
                  bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
                  creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
                >
                  <meshPhongMaterial color="#f3f3f3" />
                </RoundedBox>
                <meshBasicMaterial color="red" />
              </mesh>
            </Grabbable> */}
            {/* <Grabbable position={[0, 1.5, -0.5]}>
              <mesh position={[0, 1.5, -0.5]}>
                <boxGeometry args={[0.2, 0.2, 1]} />
                <meshBasicMaterial color="red" />
              </mesh>
            </Grabbable> */}
            {/* </Debug> */}

            {/* <color args={[0]} attach="background" /> */}
            {/* <directionalLight position={[1, 1, 2]} /> */}

            <ImmersiveSessionOrigin>
              {/* Needs to be inside ImmersiveSession Origin to use TrackedMesh/TrackedPlane */}
              <BuildRoom />
              <Hands />
              <Controllers />
            </ImmersiveSessionOrigin>
          </Physics>
        </MeshesAndPlanesProvider>
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
