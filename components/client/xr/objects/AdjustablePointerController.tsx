"use client";

import {
  useRef,
  useContext,
  useState,
  useEffect,
  Suspense,
  useMemo,
  useCallback,
} from "react";
import { Group, Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { XLinesIntersection } from "@coconut-xr/xinteraction";
import {
  XCurvedPointer,
  InputDeviceFunctions,
} from "@coconut-xr/xinteraction/react";
import { RayBasicMaterial } from "@coconut-xr/natuerlich/defaults";
import {
  useInputSourceEvent,
  SpaceGroup,
  DynamicControllerModel,
  ButtonState,
} from "@coconut-xr/natuerlich/react";

import { usePointerContext } from "@/components/client/providers/PointerStateProvider";
import { MeshesAndPlanesContext } from "@/components/client/providers";
import useInputReader from "@/hooks/useInputReader";
import { ButtonsType } from "@/utils/types";

type TriggerState = ButtonState | "NOT_SET";

const rayMaterial = new RayBasicMaterial({
  transparent: true,
  toneMapped: false,
});

const INITIAL_POINT = new Vector3(0, 0, 0);
const INITIAL_RAY_LENGTH = 0.01;
const RAY_ADJUSTMENT_SPEED = 0.5;
const BUTTONS_TO_CHECK: ButtonsType[] = [
  "a-button",
  "b-button",
  "x-button",
  "y-button",
];

function AdjustablePointerController({
  inputSource,
  id,
}: {
  inputSource: XRInputSource;
  id: number;
}) {
  const pointerRef = useRef<InputDeviceFunctions>(null);
  const [rayLength, setRayLength] = useState<number>(INITIAL_RAY_LENGTH);
  const [heldObject, setHeldObject] = useState<{
    uuid: string;
    name?: string;
  } | null>(null);
  const controllerRef = useRef<Group>(null);

  const { meshes, planes } = useContext(MeshesAndPlanesContext);
  const { pointers, setLeftPointer, setRightPointer } = usePointerContext();

  const pointerPoints = useMemo(
    () => [INITIAL_POINT, new Vector3(0, 0, -rayLength)],
    [rayLength]
  );

  const [controllerState, handedness] = useInputReader(inputSource);

  const rayOffset = rayLength * 0.5;

  const updatePointerState = useCallback(
    (
      isRight: boolean,
      zValue: number,
      stateValue: TriggerState,
      heldObject: { uuid: string; name?: string } | null
    ) => {
      const newState = {
        z: zValue,
        state: stateValue,
        heldObject: heldObject,
        controllerPosition: controllerRef.current?.position || null,
      };
      isRight ? setRightPointer(newState) : setLeftPointer(newState);
    },
    [setLeftPointer, setRightPointer]
  );

  useFrame((state, delta) => {
    let newRayLength = rayLength;

    BUTTONS_TO_CHECK.forEach((button) => {
      if (controllerState.buttonsState[button] === "pressed") {
        console.log(`${button} pressed`);
      }
    });

    const adjustment = RAY_ADJUSTMENT_SPEED * delta;

    if (controllerState.thumbstickY < -0.2) {
      newRayLength += adjustment;
    } else if (
      controllerState.thumbstickY > 0.2 &&
      rayLength > INITIAL_RAY_LENGTH
    ) {
      newRayLength -= adjustment;
    }

    if (newRayLength !== rayLength) {
      console.log("new ray length so setting ray length");
      setRayLength(newRayLength);
    }
  });

  const handleSelectStart = useCallback(
    (e: XRInputSourceEvent) => {
      // controller shake
      e.inputSource.gamepad?.hapticActuators.forEach((haptic) => {
        console.log("haptic", haptic);
        haptic.playEffect("dual-rumble", {
          duration: 100,
          strongMagnitude: 0.5,
          weakMagnitude: 0.5,
        });
      });
      updatePointerState(
        handedness === "right",
        -rayLength,
        ButtonState.PRESSED,
        heldObject
      );
      pointerRef.current?.press(0, e);
    },
    [handedness, rayLength, heldObject, updatePointerState]
  );

  const handleSelectEnd = useCallback(
    (e: XRInputSourceEvent) => {
      updatePointerState(
        handedness === "right",
        -rayLength,
        ButtonState.DEFAULT,
        heldObject
      );
      pointerRef.current?.release(0, e);
    },
    [handedness, rayLength, heldObject, updatePointerState]
  );

  useInputSourceEvent("selectstart", inputSource, handleSelectStart, [
    rayLength,
  ]);

  useInputSourceEvent("selectend", inputSource, handleSelectEnd, [rayLength]);

  const handleIntersection = (intersection: readonly XLinesIntersection[]) => {
    const isRight = handedness === "right";

    if (!intersection.length || !intersection[0].capturedObject) {
      const activeHeldObject = isRight
        ? pointers.right.heldObject
        : pointers.left.heldObject;

      if (!activeHeldObject) return;

      updatePointerState(
        isRight,
        -rayLength,
        isRight ? pointers.right.state : pointers.left.state,
        null
      );

      setHeldObject(null);
      return;
    }
    const activePointer = isRight ? pointers.right : pointers.left;
    const capturedObject = intersection[0].capturedObject;

    if (
      !activePointer.heldObject ||
      capturedObject.uuid !== activePointer.heldObject.uuid
    ) {
      console.log(`setting held object: `, capturedObject);
      setHeldObject({
        uuid: capturedObject.uuid,
        name: capturedObject.name || undefined,
      });
    }
  };

  useEffect(() => {
    handedness == "right"
      ? setRightPointer({
          z: -rayLength,
          state: pointers.right.state,
          heldObject,
          controllerPosition: controllerRef.current?.position || null,

          // heldObject: pointers.right.heldObject,
        })
      : setLeftPointer({
          z: -rayLength,
          state: pointers.left.state,
          heldObject,
          controllerPosition: controllerRef.current?.position || null,
          // heldObject: pointers.left.heldObject,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rayLength, heldObject]);
  // }, [rayLength]);

  useEffect(() => {
    if (handedness === "left") {
      setLeftPointer({
        z: -rayLength,
        state: ButtonState.DEFAULT,
        heldObject,
        controllerPosition: controllerRef.current?.position || null,
      });
    }

    if (handedness === "right") {
      setRightPointer({
        z: -rayLength,
        state: ButtonState.DEFAULT,
        heldObject,
        controllerPosition: controllerRef.current?.position || null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log(
  //     `world position of the ${handedness} controller:`,
  //     controllerRef.current?.getWorldPosition(controllerRef.current.position)
  //   );
  //   console.log(
  //     "controllerRef.current?.position",
  //     controllerRef.current?.position
  //   );
  //   console.log("controllerRef.current?", controllerRef.current);
  // }, [pointers]);

  return (
    <>
      {inputSource.gripSpace && (
        <SpaceGroup ref={controllerRef} space={inputSource.gripSpace}>
          <Suspense fallback={null}>
            <DynamicControllerModel inputSource={inputSource} />
          </Suspense>
        </SpaceGroup>
      )}
      <SpaceGroup space={inputSource.targetRaySpace}>
        <XCurvedPointer
          points={pointerPoints}
          ref={pointerRef}
          id={id}
          onIntersections={handleIntersection}
        />
        <mesh
          scale-x={0.005}
          scale-y={0.005}
          scale-z={rayLength}
          position-z={-rayOffset}
          material={rayMaterial}
        >
          <boxGeometry />
        </mesh>
      </SpaceGroup>
    </>
  );
}

export default AdjustablePointerController;
