"use client";
import React, {
  useState,
  useRef,
  useCallback,
  useMemo,
  Suspense,
  useEffect,
} from "react";
import * as ethers from "ethers";
import { useSafeAuthContext } from "@/components/client/providers/SafeAuthProvider";
import SafeAuthProvider from "@/components/client/providers/SafeAuthProvider";
// plz dont steal our 5 dollars
const TOTALLY_NOT_A_PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY!;

import { abi } from "@/utils/abi/MetaGalleryContractAbi.json";
import { METAGALLERY_ADDRESS } from "@/utils/constants";
import { AuthKitSignInData } from "@safe-global/auth-kit";

async function checkIfUserHasNFT(contract: ethers.Contract, address: string) {
  const count = await contract.balanceOf(address);
  const ans = parseInt(count._hex, 16);
  return ans;
}

function MintNft() {
  const { safeAuthSignInResponse, web3Provider, userInfo } =
    useSafeAuthContext();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const appWallet = useMemo(
    () => new ethers.Wallet(TOTALLY_NOT_A_PRIVATE_KEY, web3Provider),
    [web3Provider]
  );
  const contract = useMemo(
    () => new ethers.Contract(METAGALLERY_ADDRESS, abi, appWallet),
    [appWallet]
  );

  // *****************
  // SENDING THE NFT TO safeAuthSignInResponse.eoa
  // *****************

  useEffect(() => {
    const handleIsMinted = async (
      contract: ethers.Contract,
      safeAuthSignInResponse: AuthKitSignInData
    ) => {
      const value: number = await checkIfUserHasNFT(
        contract,
        safeAuthSignInResponse.eoa
      );
      setIsSignedIn(value ? true : false);
    };

    if (!!userInfo?.typeOfLogin && safeAuthSignInResponse) {
      handleIsMinted(contract, safeAuthSignInResponse);
    }
  }, [contract, safeAuthSignInResponse, userInfo]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="">
        <p>Is signed in: {isSignedIn}</p>
      </div>
    </Suspense>
  );
}
export default MintNft;
