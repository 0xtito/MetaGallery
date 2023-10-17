"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { MeshesAndPlanesContext } from "./";

type LoadingRoomContextProps = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingRoomContext = createContext<LoadingRoomContextProps>({
  isLoading: true,
  setIsLoading: () => {},
});

export function LoadingRoomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { meshes, planes } = useContext(MeshesAndPlanesContext);

  useEffect(() => {}, []);

  const values = useMemo(() => {
    return {
      isLoading,
      setIsLoading,
    };
  }, [isLoading]);

  return (
    <LoadingRoomContext.Provider value={values}>
      {children}
    </LoadingRoomContext.Provider>
  );
}

export default LoadingRoomProvider;
