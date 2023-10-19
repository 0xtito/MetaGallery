"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { ButtonState, useXRGamepadReader } from "@coconut-xr/natuerlich/react";
import { useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";

import {
  ButtonsObjType,
  ControllerReaderReturn,
  ButtonsType,
} from "@/utils/types";

function useInputReader(inputSource: XRInputSource): ControllerReaderReturn {
  const reader = useXRGamepadReader(inputSource);
  const [vector] = useState(new Vector2());
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [thumbstickState, setThumbstickState] = useState<ButtonState>(
    ButtonState.DEFAULT
  );

  const inputs: ButtonsType[] = useMemo(() => {
    return inputSource.handedness === "left"
      ? ["x-button", "y-button"]
      : ["a-button", "b-button"];
  }, [inputSource]);

  const initialButtonsState: ButtonsObjType = useMemo(() => {
    return inputs.reduce((acc, button) => {
      acc[button] = ButtonState.DEFAULT;
      return acc;
    }, {} as ButtonsObjType);
  }, [inputs]);

  const [buttonsState, setButtonsState] =
    useState<ButtonsObjType>(initialButtonsState);

  useFrame(() => {
    // thumbstick states
    reader.readAxes("xr-standard-thumbstick", vector);
    setX(vector.x);
    setY(vector.y);
    const tsState = reader.readButtonState("xr-standard-thumbstick");
    if (tsState !== undefined) setThumbstickState(tsState);

    // button states
    const newButtonStates: Partial<ButtonsObjType> = {};
    for (let button of inputs) {
      const buttonState = reader.readButtonState(button);
      if (buttonState !== undefined) newButtonStates[button] = buttonState;
    }
    setButtonsState((prevState) => ({ ...prevState, ...newButtonStates }));
  });

  return [
    {
      thumbstickX: x,
      thumbstickY: y,
      thumbstickState,
      buttonsState,
    },
    inputSource.handedness,
  ];
}

export default useInputReader;
