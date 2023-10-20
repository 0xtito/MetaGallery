"use client";

import React, { useEffect, useState, useContext } from "react";

import { Web3AuthContext } from "@/components/client/providers/Web3AuthProvider";
import WebXRInit from "@/components/client/xr/WebXRInit";
import { set } from "lodash";

function XRLoginPage() {
  const {
    web3AuthModalPack,
    safeAuthSignInResponse,
    web3Provider,
    userInfo,
    safeAddress,
    login,
  } = useContext(Web3AuthContext);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [startXR, setStartXR] = useState<boolean>(false);

  useEffect(() => {
    console.log("XRLoginPage useEffect");
    console.log("web3AuthModalPack", web3AuthModalPack);
    console.log("userInfo", userInfo);
    if (!!userInfo?.typeOfLogin) {
      setIsSignedIn(true);
    }
  }, [userInfo, web3AuthModalPack]);

  return (
    <>
      {!isSignedIn ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isSignedIn}
          onClick={() => {
            console.log("login");
            if (!!login) login();
            else console.log("login is null");
          }}
        >
          Sign in
        </button>
      ) : (
        <WebXRInit />
      )}
    </>
  );
}

export default XRLoginPage;

// SIGN IN RESPONSE:
// {eoa: '0x75B651289042D00EF50e21cE63082fcdc02ba487', safes: Array(0)}
// eoa
// :
// "0x75B651289042D00EF50e21cE63082fcdc02ba487"
// safes
// :
// []
