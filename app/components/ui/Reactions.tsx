"use client";
import React, { useState } from "react";
import Reaction from "@/public/Reaction";
import ReactionFill from "@/public/ReactionFill";
import Lottie from "lottie-react";
import vomit from "@/public/reactions/vomit.json";
import clap from "@/public/reactions/clap.json";
import cursing from "@/public/reactions/cursing.json";
import mindBlown from "@/public/reactions/mindBlown.json";
import yawn from "@/public/reactions/yawn.json";

export default function Reactions() {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseMove={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative bg-indigo-500 hover:bg-blockground/70  flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 "
    >
      <p className="text-[9px] cursor-default">Нет реакций</p>
      {isHover ? <ReactionFill /> : <Reaction />}

      {isHover ? (
        <div
          className={`absolute bottom-9 h-20 transition-all duration-700 transform  ${
            isHover ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        >
          <div className="relative  p-4 bg-blockground/50 rounded-full border border-gray-300 shadow-md ">
            <div className="flex  items-center justify-start gap-2 ">
              <Lottie
                animationData={clap}
                className="w-6 h-6 hover:scale-150  transition-all duration-300 cursor-pointer"
              />
              <Lottie
                animationData={mindBlown}
                className="w-6 h-6 hover:scale-150 transition-all duration-300 cursor-pointer"
              />
              <Lottie
                animationData={yawn}
                className="w-6 h-6 hover:scale-150 transition-all duration-300 cursor-pointer"
              />
              <Lottie
                animationData={cursing}
                className="w-6 h-6 hover:scale-150 transition-all duration-300 cursor-pointer"
              />
              <Lottie
                animationData={vomit}
                className="w-6 h-6 hover:scale-150 transition-all duration-300 cursor-pointer"
              />
            </div>
            <div className="absolute -bottom-5 left-8 w-8 h-8 bg-blockground/50 border border-gray-300 rounded-full"></div>
            <div className="absolute -bottom-5 left-16 w-4 h-4 bg-blockground/50 border border-gray-300 rounded-full"></div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

// <Lottie animationData={animationData} className="w-8 h-8" />;
