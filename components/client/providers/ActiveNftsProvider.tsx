"use client";

import {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { nft } from "@/utils/types";
// import { useTrackControllers } from "@/hooks";
import { Vector3 } from "three";

// interface StoredAnchor {
//   key: string;
//   anchor: XRAnchor;
// }

interface ActiveNftsContextValue {
  activeNfts: ActiveNfts[] | null;
  handleSetNft: ((nft: nft) => void) | null;
  handleRemoveNft: ((nftName: string) => void) | null;
}

interface ActiveNfts {
  nft: nft;
  spawnPosition: Vector3;
}

const ActiveNftsContext = createContext<ActiveNftsContextValue>({
  activeNfts: null,
  handleSetNft: null,
  handleRemoveNft: null,
});

export const useActiveNftsContext = () => {
  const context = useContext(ActiveNftsContext);
  if (!context) {
    throw new Error(
      "useActiveNftsContext must be used within a ActiveNftsProvider"
    );
  }
  return context;
};
/**
 * What needs to be done is:
 * - hae a globa state for the anchors
 *
 */

function ActiveNftsProvider({ children }: { children: React.ReactNode }) {
  // const [leftController, rightController] = useTrackControllers();
  const [activeNfts, setActiveNfts] = useState<ActiveNfts[]>([]);

  // const handleSetNft = useCallback(
  //   (nft: nft) => {
  //     console.log("setting nft: ", nft);
  //     const spawnLocation =
  //       rightController?.position ??
  //       leftController?.position ??
  //       new Vector3(0, 2, -1);
  //     setActiveNfts((curNfts) => [
  //       ...curNfts,
  //       {
  //         nft,
  //         spawnPosition: spawnLocation,
  //       },
  //     ]);
  //   },
  //   [setActiveNfts]
  // );

  const handleSetNft = useCallback(
    (nft: nft) => {
      console.log("setting nft: ", nft);
      const spawnLocation =
        // rightController?.position ??
        // leftController?.position ??
        new Vector3(0, 2, -1);
      setActiveNfts((curNfts) => [
        ...curNfts,
        {
          nft,
          spawnPosition: spawnLocation,
        },
      ]);
    },
    [setActiveNfts]
  );

  const handleRemoveNft = useCallback(
    (nftId: string) => {
      // const nft = activeNfts.find((n) => n.title === nftName);
      console.log("removing nft with id: ", nftId);

      setActiveNfts((curNfts) =>
        curNfts.filter(({ nft, spawnPosition }) => nft.nftId !== nftId)
      );
    },
    [setActiveNfts]
  );

  // useEffect(() => {
  //   if (_session && session === null) {
  //     setSession(_session);
  //   }

  //   console.log("in anchor use effect");

  //   return () => {
  //     setSession(null);
  //   };
  // }, [_session, session]);

  //   const [anchors, createAnchors] = usePersistedAnchor("nfts-test");
  // const deleteAnchor = useCallback(
  //   (key: string) => {
  //     if (!session) {
  //       throw new Error("No active session");
  //     }
  //     deletePersistedAnchor(session, key)
  //       .then(() => {
  //         console.log("deleted anchor: ", key);
  //         setAnchors((anchors) => anchors.filter((a) => a.key !== key));
  //       })
  //       .catch((e) => {
  //         throw new Error(e);
  //       });
  //   },
  //   [session]
  // );

  // const addAnchor = useCallback(
  //   (key: string, anchor: XRAnchor) => {
  //     if (!session) {
  //       throw new Error("No active session");
  //     }
  //     setAnchors((anchors) => [...anchors, { key, anchor }]);
  //   },
  //   [session]
  // );

  const values = useMemo(() => {
    return {
      activeNfts,
      handleSetNft,
      handleRemoveNft,
    };
  }, [activeNfts, handleSetNft, handleRemoveNft]);

  return (
    <ActiveNftsContext.Provider value={values}>
      {children}
    </ActiveNftsContext.Provider>
  );
}

export default ActiveNftsProvider;
