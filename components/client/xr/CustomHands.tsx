import { useRef, Suspense } from "react";
import {
  useHandPoses,
  DynamicHandModel,
  HandBoneGroup,
} from "@coconut-xr/natuerlich/react";
import {
  XSphereCollider,
  InputDeviceFunctions,
} from "@coconut-xr/xinteraction/react";

function CustomHands({
  radius,
  hand,
  inputSource,
  id,
}: {
  radius: number;
  hand: XRHand;
  inputSource: XRInputSource;
  id: number;
}) {
  const colliderRef = useRef<InputDeviceFunctions>(null);

  useHandPoses(
    inputSource.hand!,
    inputSource.handedness,
    (name, prevName) => {
      const isFist = name === "fist";
      const wasFist = prevName === "fist";
      if (isFist == wasFist) {
        return;
      }
      if (isFist) {
        colliderRef.current?.press(0, {});
      }
      if (wasFist) {
        colliderRef.current?.release(0, {});
      }
    },
    {
      fist: "fist.handpose",
      relax: "relax.handpose",
    }
  );

  return (
    <Suspense fallback={null}>
      <DynamicHandModel hand={hand} handedness={inputSource.handedness}>
        <HandBoneGroup joint="wrist">
          <XSphereCollider ref={colliderRef} radius={radius} id={id} />
        </HandBoneGroup>
      </DynamicHandModel>
    </Suspense>
  );
}

export default CustomHands;
