"use client";

import { createContext, useContext, useMemo } from "react";
import { useGLTF, useTexture, useProgress } from "@react-three/drei";
import { DefaultLoadingManager } from "three";

import { LoadingAssetsContextProps } from "@/utils/types";

const LoadingAssetsContext = createContext<LoadingAssetsContextProps>({
  loadingAlpha: 1,
  item: "",
  loaded: 0,
  total: 0,
});

export const useLoadingAssetsContext = (): LoadingAssetsContextProps => {
  const context = useContext(LoadingAssetsContext);
  if (!context) {
    throw new Error(
      "useLoadingAssetsContext must be used within a LoadingAssetsProvider"
    );
  }
  return context;
};

function LoadingAssetsProvider({ children }: { children: React.ReactNode }) {
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

  DefaultLoadingManager.onLoad = () => {};

  DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {};

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

  // useEffect(() => {
  //   console.log(values);
  // }, []);

  return (
    <LoadingAssetsContext.Provider value={values}>
      {children}
    </LoadingAssetsContext.Provider>
  );
}

export default LoadingAssetsProvider;
