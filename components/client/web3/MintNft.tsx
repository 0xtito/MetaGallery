"use client";
import React, { useEffect } from "react";
import * as ethers from "ethers";
import { useSafeAuthContext } from "@/components/client/providers/SafeAuthProvider";

function MintNft({
  toAddress,
  contract,
  setMintTx,
  setIsMintSuccessful,
}: {
  toAddress: string;
  contract: ethers.Contract;
  setMintTx: (tx: string) => void;
  setIsMintSuccessful: (isMintSuccessful: boolean) => void;
}) {
  const { safeAuthSignInResponse, web3Provider, userInfo } =
    useSafeAuthContext();

  // *****************
  // SENDING THE NFT TO safeAuthSignInResponse.eoa
  // *****************

  useEffect(() => {
    const handleMint = async () => {
      console.log("Minting NFT");
      console.log(contract);
      try {
        // const tx = await contract.mintNFT(toAddress, "");
        // setMintTx(tx.hash);
        // await tx.wait();
      } catch (err) {
        console.log(err);
        setIsMintSuccessful(false);
      }

      setIsMintSuccessful(true);
    };

    if (contract && toAddress) {
      handleMint();
    }
  }, [
    contract,
    safeAuthSignInResponse,
    userInfo,
    setIsMintSuccessful,
    setMintTx,
    toAddress,
  ]);

  return (
    <>
      <></>
    </>
  );
}
export default MintNft;
