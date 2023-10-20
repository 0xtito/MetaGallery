"use client";
import React from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/all";

function LoadingPageText() {
  gsap.registerPlugin(TextPlugin);

  //   React.useEffect(() => {
  //     gsap.to(".loading-text", {
  //       duration: 1,
  //       text: "Loading",
  //       repeat: -1,
  //       yoyo: true,
  //     });
  //   }, []);

  //   return (
  //     <div className="absolute flex items-center justify-center w-full h-full">
  //       <div className="loading-container">
  //         <div className="loading-bar w-64 h-2 bg-white border-2 border-white"></div>
  //         <div className="loading-text text-white text-2xl font-bold"></div>
  //       </div>
  //     </div>
  //   );
}

export default LoadingPageText;
