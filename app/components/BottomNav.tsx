import React from "react";
import Bell from "@/public/Bell";
import Search from "@/public/Search";
import Message from "@/public/Message";
import Image from "next/image";
import Add from "@/public/Add";
import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className=" w-[99%] md:hidden absolute bottom-0 mx-auto   h-[60px] bg-blockground/90 rounded-t-xl flex justify-around items-center">
      <ul className="flex gap-5">
        {/* ------------------------------------------- Добаление ---------------------------------------------- */}
        <li>
          <Link
            href="/addPost"
            className="w-[40px] h-[40px] flex items-center justify-center  p-1 rounded-xl hover:bg-blockground/70 transition-all duration-300"
          >
            <Add />
          </Link>
        </li>
        {/* ------------------------------------------------------------------------------------------------------- */}
        {/* ------------------------------------------- Cообщения ---------------------------------------------- */}
        <li>
          <div className="relative w-[40px] h-[40px] flex items-center justify-center  p-1 rounded-xl hover:bg-blockground/70 transition-all duration-300">
            <Message />
            <div className=" absolute top-0 right-0 w-3 h-3 rounded-full bg-red-600"></div>
          </div>
        </li>
        {/* ------------------------------------------------------------------------------------------------------- */}

        {/* ------------------------------------------ Аватарка  ---------------------------------------------------- */}
        <li>
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
          </div>
        </li>
        {/* ------------------------------------------------------------------------------------------------------- */}

        {/* ------------------------------------------ Поиск  ---------------------------------------------------- */}
        <li>
          <div className="w-[40px] h-[40px] flex items-center justify-center p-1 rounded-xl hover:bg-blockground/70 transition-all duration-300">
            <Search />
          </div>
        </li>
        {/* ------------------------------------------------------------------------------------------------------- */}

        {/* ------------------------------------------ Уведомления ---------------------------------------------------- */}
        <li>
          <div className="relative w-[40px] h-[40px] flex items-center justify-center p-1 rounded-xl hover:bg-blockground/70 transition-all duration-300">
            <Bell />
            <div className=" absolute top-0 right-0 w-3 h-3 rounded-full bg-red-600"></div>
          </div>
        </li>
      </ul>
    </nav>
  );
}
