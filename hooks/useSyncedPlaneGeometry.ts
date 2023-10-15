import { createPlaneGeometryFromPolygon } from "@/utils";
import React from "react";
import type { PlaneGeometry, ShapeGeometry } from "three";
import { BufferGeometry, BufferAttribute, ExtrudeGeometry } from "three";

export function useSyncedPlaneGeometry(plane: XRPlane) {
  const [geometry, setGeometry] = React.useState<THREE.ShapeGeometry | null>(
    null
  );

  React.useEffect(() => {
    const shapeGeometry = createPlaneGeometryFromPolygon(plane.polygon);
    console.log(`shapeGeometry`, shapeGeometry);
    setGeometry(shapeGeometry);
  }, [plane]);

  return geometry;
}
