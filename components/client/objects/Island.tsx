"use client";
import { useGLTF, useTexture, Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect } from "react";
import { useControls } from "leva";

import * as THREE from "three";
// @ts-ignore
import fragment from "@/shaders/FloatingContainer/fragment.glsl";
// @ts-ignore
import vertex from "@/shaders/FloatingContainer/vertex.glsl";

type LandRefType = {
  landRef: React.RefObject<
    THREE.Mesh<
      THREE.BufferGeometry<THREE.NormalBufferAttributes>,
      THREE.Material | THREE.Material[],
      THREE.Object3DEventMap
    >
  >;
  doorRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;
};

function Island({
  position,
  rotation,
  fullDoorRotation,
  doorRotation,
  fullDoorPosition,
}: {
  position: THREE.Vector3;
  rotation: THREE.Euler;
  fullDoorRotation: THREE.Euler;
  doorRotation: THREE.Euler;
  fullDoorPosition: THREE.Vector3;
}) {
  const [_doorRotation, setDoorRotation] = React.useState<THREE.Euler>(
    new THREE.Euler(0, 0, 0)
  );
  const [hoveringDoor, setHoveringDoor] = React.useState<boolean>(false);
  const initialRotation = React.useRef<THREE.Euler>(
    new THREE.Euler(0, -1.6, 0)
  );

  const islandRef = React.useRef<THREE.Group>(null!);

  useGLTF.preload("/assets/land_final.glb");
  const model = useGLTF("/assets/land_final.glb");
  const bakedTexture = useTexture("/assets/bake_final.jpg");
  const doorTexture = useTexture("/assets/onlyDoorBaked.jpg");

  useGLTF.preload("/assets/door_final.glb");
  const door = useGLTF("/assets/door_final.glb");

  // @ts-ignore
  const landNodes = model.nodes;
  // @ts-ignore
  const doorNodes = door.nodes;

  const slightlyOpenDoor = () => {
    console.log("slightlyOpenDoor");
    setHoveringDoor(true);
  };

  const closeDoor = () => {
    console.log("closeDoor");
    setHoveringDoor(false);
  };

  // console.log(ref);

  useFrame((state, delta) => {
    const xMouse = state.mouse.x * 2;
    const yMouse = -state.mouse.y * 2;

    if (hoveringDoor && _doorRotation.y > -0.45)
      setDoorRotation(
        (curValue) =>
          new THREE.Euler(
            0,
            curValue.y - delta < -0.45 ? -0.45 : curValue.y - delta,
            0
          )
      );

    if (!hoveringDoor && _doorRotation.y < 0)
      setDoorRotation(
        (curValue) =>
          new THREE.Euler(0, curValue.y + delta > 0 ? 0 : curValue.y + delta, 0)
      );

    // console.log(ref.current);

    if (islandRef.current) {
      islandRef.current.rotation.x = initialRotation.current.x + yMouse * 0.02;
      islandRef.current.rotation.y = initialRotation.current.y + xMouse * 0.02;
    }
  });

  return (
    <>
      <group
        // ref={ref}
        ref={islandRef}
        name="completeLand"
        rotation={new THREE.Euler(0, rotation.y, 0)}
        position={position}
      >
        <mesh geometry={landNodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} map-flipY={false} />
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
            onPointerEnter={slightlyOpenDoor}
            onPointerLeave={closeDoor}
          >
            <group name="doorRotatedAroundHinge">
              <mesh
                name="door"
                geometry={doorNodes.door_.geometry}
                position={doorNodes.door_.position}
                rotation={_doorRotation}
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
