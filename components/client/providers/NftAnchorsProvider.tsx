"use client";

import {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  use,
} from "react";
import { usePersistedAnchor, useXR } from "@coconut-xr/natuerlich/react";
import { deletePersistedAnchor } from "@coconut-xr/natuerlich";

interface StoredAnchor {
  key: string;
  anchor: XRAnchor;
}

interface NftAnchorsContextValue {
  anchors: StoredAnchor[] | null;
  deleteAnchor: ((key: string) => void) | null;
  addAnchor: ((key: string, anchor: XRAnchor) => void) | null;
}

const NftAnchorsContext = createContext<NftAnchorsContextValue>({
  anchors: null,
  deleteAnchor: null,
  addAnchor: null,
});

export const useNftAnchorsContext = () => {
  const context = useContext(NftAnchorsContext);
  if (!context) {
    throw new Error(
      "useNftAnchorsContext must be used within a NftAnchorsProvider"
    );
  }
  return context;
};
/**
 * What needs to be done is:
 * - hae a globa state for the anchors
 *
 */

function NftAnchorsProvider({ children }: { children: React.ReactNode }) {
  const [anchors, setAnchors] = useState<StoredAnchor[]>([]);
  const [session, setSession] = useState<XRSession | null>(null);

  const [_anchors, createAnchors] = usePersistedAnchor("nfts-test");
  const _session = useXR.getState().session;

  console.log("real session", _session);

  useEffect(() => {
    if (_session && session === null) {
      setSession(_session);
    }

    console.log("in anchor use effect");

    return () => {
      setSession(null);
    };
  }, [_session, session]);

  //   const [anchors, createAnchors] = usePersistedAnchor("nfts-test");
  const deleteAnchor = useCallback(
    (key: string) => {
      if (!session) {
        throw new Error("No active session");
      }
      deletePersistedAnchor(session, key)
        .then(() => {
          console.log("deleted anchor: ", key);
          setAnchors((anchors) => anchors.filter((a) => a.key !== key));
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
    [session]
  );

  const addAnchor = useCallback(
    (key: string, anchor: XRAnchor) => {
      if (!session) {
        throw new Error("No active session");
      }
      setAnchors((anchors) => [...anchors, { key, anchor }]);
    },
    [session]
  );

  const values = useMemo(() => {
    if (!session) {
      return {
        anchors: null,
        deleteAnchor: null,
        addAnchor: null,
      };
    }

    return {
      anchors,
      deleteAnchor,
      addAnchor,
    };
  }, [anchors, deleteAnchor, addAnchor, session]);

  return (
    <NftAnchorsContext.Provider value={values}>
      {children}
    </NftAnchorsContext.Provider>
  );
}
