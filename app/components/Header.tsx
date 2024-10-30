import React from "react";
import Bell from "@/public/Bell";
import Search from "@/public/Search";
import Message from "@/public/Message";

import Link from "next/link";
import ProfileMenu from "./ui/ProfileMenu";
import Settings from "@/public/Settings";

export default function Header() {
  return (
    <header className="w-[99%] flex mt-2 h-[60px]  bg-blockground/90 rounded-b-xl  md:justify-around justify-between  items-center">
      {/* ------------------------------------------- Профиль и сообщения ---------------------------------------------- */}

      <div className="md:flex  hidden justify-center items-center ">
        <ProfileMenu />
        <div className="relative w-[40px] h-[40px] flex items-center justify-center  p-1 rounded-xl hover:bg-blockground/70 transition-all duration-300">
          <Message />
          <div className=" absolute top-0 right-0 w-3 h-3 rounded-full bg-red-600"></div>
        </div>
      </div>
      {/* ------------------------------------------------------------------------------------------------------- */}

      {/* ------------------------------------------ Логотип ---------------------------------------------------- */}

      <div className="ml-14 md:ml-0">
        <Link href="/" className="font-extrabold text-3xl text-fuchsia-200">
          Tema
        </Link>
      </div>

      {/* ------------------------------------------------------------------------------------------------------- */}

      {/* ------------------------------------------ Поиск и уведомления ---------------------------------------------------- */}

      <div className="md:flex  hidden  justify-center items-center">
        <div className="w-[40px] h-[40px] flex items-center justify-center  p-1 rounded-xl hover:bg-blockground/70 transition-all duration-300">
          <Search />
        </div>
        <div className="relative w-[40px] h-[40px] flex items-center justify-center p-1 rounded-xl hover:bg-blockground/70 transition-all duration-300">
          <Bell />
          <div className=" absolute top-0 right-0 w-3 h-3 rounded-full bg-red-600"></div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------------------------------------ */}

      <div className="flex md:hidden w-[40px] h-[40px] items-center justify-center mr-14  p-1 rounded-xl hover:bg-blockground/70 transition-all duration-300">
        <Settings />
      </div>
    </header>
  );
}