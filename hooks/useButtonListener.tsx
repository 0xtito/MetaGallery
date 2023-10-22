"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import { useTrackControllers } from ".";

import {
  ButtonsType,
  LeftControllerState,
  RightControllerState,
} from "@/utils/types";

function useButtonListener(button: ButtonsType) {
  const [leftController, rightController] = useTrackControllers();

  const [buttonPressed, setButtonPressed] = useState(false);
  const buttonStateRef = useRef(false);

  useEffect(() => {
    // const isLeftControllerRelevant =
    //   leftController && (button === "x-button" || button === "y-button");

    if (leftController && (button === "x-button" || button === "y-button")) {
      if (
        leftController.gamepad.buttons[button] === "pressed" &&
        !buttonStateRef.current
      ) {
        buttonStateRef.current = true;
        setButtonPressed(true);
      } else if (
        buttonStateRef.current &&
        leftController.gamepad.buttons[button] !== "pressed"
      ) {
        buttonStateRef.current = false;
        setButtonPressed(false);
      }
    }
  }, [leftController, button]);

  useEffect(() => {
    if (rightController && (button === "a-button" || button === "b-button")) {
      if (
        rightController.gamepad.buttons[button] === "pressed" &&
        !buttonStateRef.current
      ) {
        buttonStateRef.current = true;
        setButtonPressed(true);
      } else if (
        buttonStateRef.current &&
        rightController.gamepad.buttons[button] !== "pressed"
      ) {
        buttonStateRef.current = false;
        setButtonPressed(false);
      }
    }
  }, [rightController, button]);

  const value = useMemo(() => {
    return buttonPressed;
  }, [buttonPressed]);

  return value;
}

export default useButtonListener;

// function useButtonListener(button: ButtonsType) {
//   const [leftController, rightController] = useTrackControllers();

//   const [buttonPressed, setButtonPressed] = useState(false);
//   const buttonStateRef = useRef(false);

//   useEffect(() => {
//     const isLeftControllerRelevant =
//       leftController && (button === "x-button" || button === "y-button");
//     const isRightControllerRelevant =
//       rightController && (button === "a-button" || button === "b-button");

//     if (isLeftControllerRelevant || isRightControllerRelevant) {
//       const currentController = isLeftControllerRelevant
//         ? leftController
//         : rightController;

//       if (
//         isLeftControllerRelevant &&
//         (button === "x-button" || button === "y-button") &&
//         (currentController as LeftControllerState).gamepad.buttons[button] ===
//           "pressed" &&
//         !buttonStateRef.current
//       ) {
//         buttonStateRef.current = true;
//         setButtonPressed(true);
//       } else if (
//         isRightControllerRelevant &&
//         (button === "a-button" || button === "b-button") &&
//         buttonStateRef.current &&
//         (currentController as RightControllerState).gamepad.buttons[button] !==
//           "pressed"
//       ) {
//         buttonStateRef.current = false;
//         setButtonPressed(false);
//       }
//     }
//   }, [leftController, rightController, button]); // Removed buttonPressed from dependencies

//   return buttonPressed;
// }
