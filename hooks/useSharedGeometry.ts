import { useEffect, useState } from "react";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

import * as THREE from "three";

// declare abstract class XRPlane implements XRPlane {}

export function useSharedGeometry(
  xrEntity: XRPlane | XRMesh,
  type: "plane" | "mesh"
) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

  useEffect(() => {
    // quick fix, need to address later
    if (type === "plane") {
      const shape = new THREE.Shape();
      shape.setFromPoints(
        (xrEntity as XRPlane).polygon.map(
          ({ x, z }) => new THREE.Vector2(x, -z)
        )
      );
      const shapeGeometry = new THREE.ShapeGeometry(shape);
      shapeGeometry.rotateX(-Math.PI / 2);
      const bufferGeometry = BufferGeometryUtils.mergeGeometries([
        shapeGeometry,
      ]);

      setGeometry(bufferGeometry);
    } else if (type === "mesh") {
      const bufferGeometry = new THREE.BufferGeometry();
      bufferGeometry.setIndex(
        new THREE.BufferAttribute((xrEntity as XRMesh).indices, 1)
      );
      bufferGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute((xrEntity as XRMesh).vertices, 3)
      );
      setGeometry(bufferGeometry);
    }
  }, [xrEntity, type]);

  return geometry;
}
