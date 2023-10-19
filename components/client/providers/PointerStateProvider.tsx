"use client";

import { ButtonState } from "@coconut-xr/natuerlich/react";
import React, {
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Vector3 } from "three";

type TriggerState = ButtonState | "NOT_SET";

type PointerState = {
  z: number;
  state: TriggerState;
  heldObject: { uuid: string; name?: string } | null;
  controllerPosition: Vector3 | null;
};

type Pointers = {
  left: PointerState;
  right: PointerState;
};

type PointerStateContextValue = {
  pointers: Pointers;
  setLeftPointer: (data: PointerState) => void;
  setRightPointer: (data: PointerState) => void;
};

const PointerStateContext = React.createContext<
  PointerStateContextValue | undefined
>(undefined);

export const usePointerContext = (): PointerStateContextValue => {
  const context = useContext(PointerStateContext);
  if (!context) {
    throw new Error("usePointerContext must be used within a PointerProvider");
  }
  return context;
};

function PointerStateProvider({ children }: { children: React.ReactNode }) {
  const initialState: Pointers = {
    left: {
      z: 0,
      state: "NOT_SET",
      controllerPosition: null,
      heldObject: null,
    },
    right: {
      z: 0,
      state: "NOT_SET",
      controllerPosition: null,
      heldObject: null,
    },
  };

  const [pointers, setPointers] = useState(initialState);

  const setLeftPointer = useCallback((data: PointerState) => {
    setPointers((prev) => ({
      ...prev,
      left: data,
    }));
  }, []);

  const setRightPointer = useCallback((data: PointerState) => {
    setPointers((prev) => ({
      ...prev,
      right: data,
    }));
  }, []);

  // useEffect(() => {
  //   console.log(`pointers.left`, pointers.left);
  //   console.log(`pointers.right`, pointers.right);
  // }, [pointers]);

  const values = useMemo(() => {
    return {
      pointers,
      setLeftPointer,
      setRightPointer,
    };
  }, [pointers, setLeftPointer, setRightPointer]);

  return (
    <PointerStateContext.Provider value={values}>
      {children}
    </PointerStateContext.Provider>
  );
}

export default PointerStateProvider;
