"use client";
import { useState, useEffect } from "react";

import { cn } from "@/utils";
import { useLoadingAssetsContext } from "@/components/client/providers/LoadingAssetsProvider";

function LoadingPageButton({
  setShowLoadingScreen,
}: {
  setShowLoadingScreen: (value: boolean) => void;
}) {
  const { total, loaded } = useLoadingAssetsContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("bruhh");
  }, []);

  return (
    // <Transition
    //   show={true}
    //   enter=""
    //   enterFrom=""
    //   enterTo="opacity-100"
    //   leave="transition-opacity duration-150"
    //   leaveFrom="opacity-100"
    //   leaveTo="opacity-0"
    // >
    <div className="z-10 absolute flex items-center justify-center w-1/2 h-full">
      <div className="loading-container">
        <div className="loading-bar w-64 h-full bg-white border-2 border-white">
          {/* <button
        type="button"
        className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        onSubmit={() => setShowLoadingScreen(false)}
      >
        Begin
      </button> */}
        </div>
      </div>
    </div>
    // {/* // </Transition> */}
  );
}

export default LoadingPageButton;
