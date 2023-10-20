"use client";
import { useFrame } from "@react-three/fiber";
import React, { useState, useRef } from "react";
import * as THREE from "three";
import { useRouter } from "next/navigation";

import { useLoadingAssetsContext } from "@/components/client/providers/LoadingAssetsProvider";

// only for testing
interface IslandTestingProps {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  fullDoorRotation: THREE.Euler;
  doorRotation?: THREE.Euler;
  fullDoorPosition: THREE.Vector3;
  lightPosition?: THREE.Vector3;
  lightScale?: THREE.Vector3;
  lightRotation?: THREE.Euler;
  targetPosition?: THREE.Vector3;
}

function Island({
  position,
  rotation,
  fullDoorRotation,
  doorRotation: _doorRotation,
  fullDoorPosition,
  lightPosition,
  lightScale,
  lightRotation,
  targetPosition,
}: IslandTestingProps) {
  const { land, door, landTexture, doorTexture } = useLoadingAssetsContext();
  const [doorRotation, setDoorRotation] = useState<THREE.Euler>(
    new THREE.Euler(0, 0, 0)
  );
  const [hoveringDoor, setHoveringDoor] = useState<boolean>(false);
  const initialRotation = useRef<THREE.Euler>(new THREE.Euler(0, -1.6, 0));

  const router = useRouter();

  console.log("island rendered");

  const islandRef = useRef<THREE.Group>(null!);

  const handleDoorClick = () => {
    console.log("Door clicked");
    // let sendToQuestUrl = new URL("https://oculus.com/open_url/");
    // let linkUrl = "http://localhost:3000/xr";
    // sendToQuestUrl.searchParams.set("url", linkUrl);
    // router.push(sendToQuestUrl.toString());
    router.push("/xr");
  };

  // @ts-ignore
  const landNodes = land.nodes;
  // @ts-ignore
  const doorNodes = door.nodes;

  useFrame((state, delta) => {
    const xMouse = state.mouse.x * 2;
    const yMouse = -state.mouse.y * 2;

    if (hoveringDoor && doorRotation.y > -0.45)
      setDoorRotation(
        (curValue) =>
          new THREE.Euler(
            0,
            curValue.y - delta < -0.45 ? -0.45 : curValue.y - delta,
            0
          )
      );

    if (!hoveringDoor && doorRotation.y < 0)
      setDoorRotation(
        (curValue) =>
          new THREE.Euler(0, curValue.y + delta > 0 ? 0 : curValue.y + delta, 0)
      );

    if (islandRef.current) {
      islandRef.current.rotation.x = initialRotation.current.x + yMouse * 0.02;
      islandRef.current.rotation.y = initialRotation.current.y + xMouse * 0.02;
    }
  });

  return (
    <>
      <group
        ref={islandRef}
        name="completeLand"
        rotation={new THREE.Euler(0, rotation.y, 0)}
        position={position}
      >
        <mesh geometry={landNodes.baked.geometry}>
          <meshBasicMaterial map={landTexture} map-flipY={false} />
        </mesh>

        <group
          name="completeDoor"
          position={fullDoorPosition}
          rotation={fullDoorRotation}
        >
          <mesh
            name="frame"
            geometry={doorNodes.fullDoor_.geometry}
            position={doorNodes.fullDoor_.position}
          >
            <meshBasicMaterial map={doorTexture} map-flipY={false} />
          </mesh>

          <group
            name="doorWithHingeAtOrigin"
            onPointerEnter={() => setHoveringDoor(true)}
            onPointerLeave={() => setHoveringDoor(false)}
            onClick={() => handleDoorClick()}
          >
            <group name="doorRotatedAroundHinge">
              <mesh
                name="door"
                geometry={doorNodes.door_.geometry}
                position={doorNodes.door_.position}
                rotation={doorRotation}
              >
                <meshBasicMaterial map={doorTexture} map-flipY={false} />
                {doorNodes.door_.children.map((child: any) => (
                  <mesh
                    key={child.uuid}
                    geometry={child.geometry}
                    position={child.position}
                  >
                    <meshBasicMaterial map={doorTexture} map-flipY={false} />
                  </mesh>
                ))}
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}

export default React.memo(Island);
