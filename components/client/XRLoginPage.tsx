"use client";

import React, { useEffect, useState, useContext } from "react";

import { useSafeAuthContext } from "@/components/client/providers/SafeAuthProvider";
import WebXRInit from "@/components/client/xr/WebXRInit";
import TestPush from "./push/TestPush";
import { MintNft } from "./web3";
import Link from "next/link";
import {
  FadeTransition,
  LoadingSpinner,
  Toaster,
} from "@/components/client/ui";
import { useTransition } from "react";

// const buttonStates

function XRLoginPage() {
  const {
    web3AuthModalPack,
    safeAuthSignInResponse,
    web3Provider,
    userInfo,
    safeAddress,
    login,
  } = useSafeAuthContext();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [showFirstToaster, setFirstToaster] = useState<boolean>(false);
  const [showSecondToaster, setSecondToaster] = useState<boolean>(false);
  const [showThirdToaster, setThirdToaster] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("Sign in");
  const [startXR, setStartXR] = useState<boolean>(false);

  useEffect(() => {
    console.log("XRLoginPage useEffect");
    console.log("web3AuthModalPack", web3AuthModalPack);
    console.log("userInfo", userInfo);
    if (!!userInfo?.typeOfLogin) {
      setIsSignedIn(true);
    }
  }, [userInfo, web3AuthModalPack]);

  const handleWeb3SignIn = async () => {
    console.log("handleWeb3SignIn");
    setIsLoading(true);
    setButtonText("");
    if (!!login) {
      await login();
      console.log("logged in");
      console.log("userInfo", userInfo);
      setFirstToaster(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col justify-between">
        <div className="p-4 flex justify-between items-center">
          <div className="text-white flex-1 flex justify-center">
            <h1 className="text-2xl tracking-wide">MetaGallery</h1>
          </div>
          <a
            href={"https://ethglobal.com/events/ethonline2023"}
            className="absolute right-4 text-white hover:underline"
            target="_blank"
          >
            ethOnline 2023
          </a>
        </div>

        <div className="flex flex-1 flex-col justify-center items-center space-y-8">
          <h2 className="text-4xl tracking-wide text-center">
            Display your NFTs the way they were meant to be displayed
          </h2>
          <button
            className="bg-white text-black px-6 py-3 rounded-md "
            onClick={
              !isSignedIn ? () => handleWeb3SignIn() : () => setStartXR(true)
            }
          >
            {/* {isLoading ? <LoadingSpinner /> : buttonText} */}
            <FadeTransition
              show={isLoading}
              afterExit={() => setButtonText("Begin")}
            >
              <LoadingSpinner />
            </FadeTransition>
            {buttonText}
          </button>
        </div>

        <div className="p-4">
          <span>by </span>
          <a
            className="underline"
            href="https://github.com/0xtito"
            target="_blank"
          >
            tito
          </a>
          <span> and </span>
          <a
            className="underline"
            href="https://github.com/racampos"
            target="_blank"
          >
            raphael
          </a>
        </div>
      </div>
      <Toaster
        titleText="Successfully Signed in!"
        subText="Thanks to Safe and Web3Auth :)"
        success={true}
        show={showFirstToaster}
        setShow={setFirstToaster}
      />
      <Toaster
        titleText="Your free NFT has been minted!"
        subText={`Check your wallet ${(
          <a href={"mintTx"} target="_blank">
            here
          </a>
        )}`}
        success={true}
        show={showFirstToaster}
        setShow={setFirstToaster}
      />
      <Toaster
        titleText="Successfully Signed in!"
        subText="Thanks to Safe and Web3Auth :)"
        success={true}
        show={showFirstToaster}
        setShow={setFirstToaster}
      />
    </>
  );
}

export default XRLoginPage;
