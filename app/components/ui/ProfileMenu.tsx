"use client";
import Image from "next/image";
import AngleDown from "@/public/AngleDown";
import Close from "@/public/Close";
import Add from "@/public/Add";
import Settings from "@/public/Settings";
import ProfileCard from "@/public/ProfileCard";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { LOGOUT } from "@/app/graphql/mutations";
import { removeTokens, getAccessToken } from "@/app/lib/auth";

export default function ProfileMenu() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [logout] = useMutation(LOGOUT);

  const handleLogout = async () => {
    try {
      const accessToken = getAccessToken();
      if (!accessToken) {
        removeTokens();
        router.push("/auth/login");
        return;
      }

      await logout({
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        },
      });

      removeTokens();
      router.push("/auth/login");
    } catch (err: any) {
      removeTokens();
      router.push("/auth/login");
    }
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="relative flex justify-center items-center p-1 rounded-xl hover:blockground/70 transition-all duration-300"
    >
      <div className="w-[40px] h-[40px] rounded-full">
        <Image
          className="rounded-full"
          src="/profile.jpg"
          width={40}
          height={40}
          alt="profile"
        />
      </div>
      <div className="w-[20px] h-[20px] flex justify-center items-center">
        {isOpen ? <Close /> : <AngleDown />}
      </div>
      {isOpen && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute top-[54px] left-0 px-3 py-2  rounded-b-xl bg-blockground/90 flex flex-col justify-center items-start"
        >
          <Link
            className="py-2 pr-32 pl-3  w-full rounded-xl hover:bg-blockground/70 transition-all duration-300 flex gap-3"
            href="/addPost"
          >
            <Add />
            <span>Добавить</span>
          </Link>
          <Link
            className="py-2 pr-32 pl-3  w-full rounded-xl hover:bg-blockground/70 transition-all duration-300 flex gap-3"
            href="#"
          >
            <Settings />
            <span>Настройки</span>
          </Link>
          <Link
            className="py-2 pr-32 pl-3  w-full rounded-xl hover:bg-blockground/70 transition-all duration-300 flex gap-3"
            href="#"
          >
            <ProfileCard />
            <span> Профиль</span>
          </Link>
          <div className="w-[90%] h-1 bg-slate-300/40 rounded-xl"></div>
          <button
            type="button"
            className="py-2 pr-32 pl-3  w-full rounded-xl hover:bg-blockground/70 transition-all duration-300"
            onClick={handleLogout}
          >
            Выход
          </button>
        </div>
      )}
    </div>
  );
}
