"use client";

import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Quaternion } from "three";
import { ButtonState, useInputSources } from "@coconut-xr/natuerlich/react";

import {
  RightControllerState,
  LeftControllerState,
  useTrackControllersReturn,
  ButtonsType,
  GamepadButtonState,
} from "@/utils/types";
// import { GamepadButtonState } from "@coconut-xr/natuerlich/react";

const getButtonState = (button: {
  pressed: boolean;
  touched: boolean;
  value: number;
}): GamepadButtonState => ({
  pressed: button.pressed,
  touched: button.touched,
  value: button.value,
});

function useTrackControllers(): useTrackControllersReturn {
  const [inputSourcesInitialized, setInputSourcesInitialized] = useState(false);
  const [leftController, setLeftController] =
    useState<LeftControllerState | null>(null);
  const [rightController, setRightController] =
    useState<RightControllerState | null>(null);
  const inputSources = useInputSources();

  useEffect(() => {
    if (inputSources.length > 0) {
      setInputSourcesInitialized(true);
    } else {
      setInputSourcesInitialized(false); // to avoid breaking when controllers are disconnected
    }
  }, [inputSources]);

  useFrame((state, delta, frame: XRFrame | undefined) => {
    if (!inputSourcesInitialized || !frame) return;

    const referenceSpace = state.gl.xr.getReferenceSpace();
    if (!referenceSpace) return;

    for (let inputSource of inputSources) {
      const { handedness, gripSpace, gamepad } = inputSource;

      if (!handedness || !gripSpace || !gamepad) continue;

      // const [bottomButtonName, topButtonName] =
      //   handedness === "left"
      //     ? ["x-button", "y-button"]
      //     : ["a-button", "b-button"];
      const bottomButtonName = handedness === "left" ? "x-button" : "a-button";
      const topButtonName = handedness === "left" ? "y-button" : "b-button";

      // button[4] is the bottom button
      // button[5] is the top button
      // gamepad.buttons.forEach((button, index) => {
      //   let buttonName: ButtonsType | undefined;
      //   switch (index) {
      //     case 4:
      //       buttonName = handedness === "left" ? "x-button" : "a-button";
      //       break;
      //     case 5:
      //       buttonName = handedness === "left" ? "y-button" : "b-button";
      //       break;
      //   }
      //   const buttonPressed = button.pressed ? 1 : 0;
      //   const buttonTouched = button.touched ? 1 : 0;
      // const buttonValue = button.value;
      // if (index === 4) {
      //   console.log(
      //     `${handedness === "left" ? "x" : "a"} button pressed: `,
      //     buttonPressed
      //   );
      // }
      // if (index === 5) {
      //   console.log(
      //     `${handedness === "left" ? "y" : "b"}  button pressed: `,
      //     buttonPressed
      //   );
      // }
      // });

      const pose = frame.getPose(gripSpace, referenceSpace);
      if (!pose) continue;

      const bottomButtonState = getButtonState(gamepad.buttons[4]).pressed
        ? ButtonState.PRESSED
        : getButtonState(gamepad.buttons[4]).touched
        ? ButtonState.TOUCHED
        : ButtonState.DEFAULT;

      const topButtonState = getButtonState(gamepad.buttons[5]).pressed
        ? ButtonState.PRESSED
        : getButtonState(gamepad.buttons[5]).touched
        ? ButtonState.TOUCHED
        : ButtonState.DEFAULT;

      const { position, orientation } = pose.transform;

      let controllerState: LeftControllerState | RightControllerState;

      // I know this is ugly plz forgive me

      if (handedness === "left") {
        controllerState = {
          visible: true,
          position: new Vector3(position.x, position.y, position.z),
          orientation: new Quaternion(
            orientation.x,
            orientation.y,
            orientation.z,
            orientation.w
          ),
          gamepad: {
            axes: gamepad.axes,
            buttons: {
              "x-button": bottomButtonState,
              "y-button": topButtonState,
            },
          },
        } as LeftControllerState;

        setLeftController(controllerState);
      } else if (handedness === "right") {
        controllerState = {
          visible: true,
          position: new Vector3(position.x, position.y, position.z),
          orientation: new Quaternion(
            orientation.x,
            orientation.y,
            orientation.z,
            orientation.w
          ),
          gamepad: {
            axes: gamepad.axes,
            buttons: {
              "a-button": bottomButtonState,
              "b-button": topButtonState,
            },
          },
        } as RightControllerState;
        setRightController(controllerState);
      }
    }
  });

  return [leftController, rightController];
}

export default useTrackControllers;
