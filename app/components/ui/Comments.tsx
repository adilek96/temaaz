"use client";
import React, { useState } from "react";
import Comment from "@/public/Comment";
import CommentFill from "@/public/CommentFill";

export default function Comments() {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseMove={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative bg-blockground hover:bg-blockground/70  flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300 cursor-pointer"
    >
      <p className="text-[9px] cursor-pointer">Нет коментариев</p>
      {isHover ? <CommentFill /> : <Comment />}
    </div>
  );
}
