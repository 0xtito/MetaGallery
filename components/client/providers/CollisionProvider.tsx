"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";

interface CollisionContextType {}

export const CollisionContext = createContext<CollisionContextType>({});

function CollisionProvider() {
  const [state, setState] = useState<CollisionContextType>({});

  return (
    <CollisionContext.Provider value={state}>
      <></>
    </CollisionContext.Provider>
  );
}

export default CollisionProvider;
