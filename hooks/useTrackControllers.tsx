import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Quaternion } from "three";
import { useInputSources } from "@coconut-xr/natuerlich/react";

import { ControllerState, useTrackControllersReturn } from "@/utils/types";

function useTrackControllers(): useTrackControllersReturn {
  const [inputSourcesInitialized, setInputSourcesInitialized] = useState(false);
  const [leftController, setLeftController] = useState<ControllerState | null>(
    null
  );
  const [rightController, setRightController] =
    useState<ControllerState | null>(null);
  const inputSources = useInputSources();

  useEffect(() => {
    if (inputSources.length > 0) {
      setInputSourcesInitialized(true);
    }
  }, [inputSources]);

  useFrame((state, delta, frame: XRFrame | undefined) => {
    if (!inputSourcesInitialized || !frame) return;

    const referenceSpace = state.gl.xr.getReferenceSpace();
    if (!referenceSpace) return;

    for (let inputSource of inputSources) {
      const { handedness, gripSpace } = inputSource;

      if (!handedness || !gripSpace) continue;

      const pose = frame.getPose(gripSpace, referenceSpace);
      if (!pose) continue;

      const { position, orientation } = pose.transform;
      const controllerState = {
        visible: true,
        position: new Vector3(position.x, position.y, position.z),
        orientation: new Quaternion(
          orientation.x,
          orientation.y,
          orientation.z,
          orientation.w
        ),
      };

      if (handedness === "left") {
        setLeftController(controllerState);
      } else if (handedness === "right") {
        setRightController(controllerState);
      }
    }
  });

  return [leftController, rightController];
}

export default useTrackControllers;
