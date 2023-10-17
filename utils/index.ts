import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as THREE from "three";

export function wrapText(text: string, maxLength: number): string {
  const words = text.split(" ");
  let wrappedText = "";
  let line = "";

  for (let word of words) {
    if ((line + word).length <= maxLength) {
      line += word + " ";
    } else {
      wrappedText += line + "\n";
      line = word + " ";
    }
  }
  wrappedText += line;
  return wrappedText.trim();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Extracted from @coconut-xr--natuerlich
 * Thanks :)
 */
export function createPlaneGeometryFromPolygon(polygon: DOMPoint[]) {
  const shape = new THREE.Shape();
  shape.setFromPoints(polygon.map(({ x, z }) => new THREE.Vector2(x, -z)));
  const geometry = new THREE.ShapeGeometry(shape);
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}
