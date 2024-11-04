"use client";
import Ban from "@/public/Ban";
import Trash from "@/public/Trash";
import Share from "@/public/Share";
import Edit from "@/public/Edit";
import { useState } from "react";
import Link from "next/link";
import VerticalDots from "@/public/VerticalDots";

export default function PostMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className=" relative w-[40px] h-[40px] flex items-center justify-center  p-1 rounded-xl hover:bg-blockground/70 transition-all duration-300"
    >
      <VerticalDots />
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-[40px] text-[12px] right-0 px-3 py-2  rounded-xl bg-blockground/90 flex flex-col justify-center items-start"
        >
          <Link
            className="py-1 pr-12 pl-3  w-full rounded-xl hover:bg-blockground/70 transition-all duration-300 flex items-center gap-2"
            href="/addPost"
          >
            <Share />
            <span>Поделится</span>
          </Link>

          <Link
            className="py-1 pr-12 pl-3  w-full rounded-xl hover:bg-blockground/70 transition-all duration-300 items-center flex gap-2"
            href="#"
          >
            <Ban />
            <span>Пожаловатся</span>
          </Link>
          <Link
            className="py-1 pr-12 pl-3  w-full rounded-xl hover:bg-blockground/70 transition-all duration-300 items-center flex gap-2"
            href="#"
          >
            <Edit />
            <span>Редактировать</span>
          </Link>
          <Link
            className="py-1 pr-12 pl-3 text-red-400 hover:text-red-600  w-full rounded-xl hover:bg-blockground/70 transition-all duration-300 items-center flex gap-2"
            href="#"
          >
            <Trash />
            <span>Удалить</span>
          </Link>
        </div>
      )}
    </div>
  );
}
