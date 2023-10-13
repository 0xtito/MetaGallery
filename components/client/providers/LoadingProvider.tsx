"use client";

import { createContext, useEffect, useMemo } from "react";
import { useGLTF, useTexture, useProgress } from "@react-three/drei";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from "three";

import { LoadingContextProps } from "@/utils/types";

export const LoadingContext = createContext<LoadingContextProps>({
  loadingAlpha: 1,
  item: "",
  loaded: 0,
  total: 0,
});

function LoadingProvider({ children }: { children: React.ReactNode }) {
  useGLTF.preload("/assets/island/land_final.glb");
  useGLTF.preload("/assets/island/door_final.glb");
  useTexture.preload("/assets/island/land_baked.jpg");
  useTexture.preload("/assets/island/door_baked.jpg");

  const land = useGLTF("/assets/island/land_final.glb");
  const door = useGLTF("/assets/island/door_final.glb");
  const landTexture = useTexture("/assets/island/land_baked.jpg");
  const doorTexture = useTexture("/assets/island/door_baked.jpg");
  const { active, progress, errors, item, loaded, total } = useProgress();

  const loadingAlpha = useMemo(() => {
    return active ? progress : 0;
  }, [active, progress]);

  useEffect(() => {
    console.log({ active, progress, errors, item, loaded, total });
  }, [active, loaded]);

  THREE.DefaultLoadingManager.onLoad = () => {};

  THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {};

  const values = useMemo(() => {
    return {
      land,
      door,
      landTexture,
      doorTexture,
      loadingAlpha,
      item,
      loaded,
      total,
    };
  }, [item, loaded]);

  useEffect(() => {
    console.log(values);
  }, []);

  return (
    <LoadingContext.Provider value={values}>{children}</LoadingContext.Provider>
  );
}

export default LoadingProvider;
