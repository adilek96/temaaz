import React from "react";
import Image from "next/image";
import Reactions from "./ui/Reactions";
import Comments from "./ui/Comments";

import PostMenu from "./ui/PostMenu";

export default async function Post() {
  return (
    <div className="md:w-[70%]  w-[95%] mt-5 md:mt-0 py-2   flex flex-col justify-center items-center bg-blockground/90 rounded-xl">
      <div className="w-full flex justify-between px-3 mb-2">
        <div className="flex justify-center items-center">
          <div className="w-[40px] h-[40px]  p-1 rounded-xl hover:bg-blockground/70 transition-all duration-300">
            <Image
              className="rounded-full"
              src="/profile.jpg"
              width={40}
              height={40}
              alt="profile"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="text-xs">Admin Adminius</h2>
            <p className="text-[10px] text-green-600">Online</p>
          </div>
        </div>

        <PostMenu />
      </div>
      {/* ////////////////////////////////////////////////////// */}
      <div className="w-full bg-white h-[200px]"></div>
      <div className="w-full flex justify-start px-5 mt-2 gap-2">
        <Reactions />
        <Comments />
      </div>
    </div>
  );
}
