"use client";

import { useState } from "react";

import { MdEmail } from "react-icons/md";
import Link from "next/link";

export default function PasswordResetForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2 text-black">
        <label htmlFor="email">Email</label>
        <div className="relative">
          <MdEmail className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            className="py-1 px-7 ring-blockground/90 rounded-2xl w-full ring-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blockground/90 hover:bg-blockground/70 transition-all duration-300 py-2 rounded-2xl text-white hover:text-gray-400"
      >
        Отправить инструкции
      </button>

      <div className="text-center">
        <Link
          href="/auth/login"
          className="text-sm font-medium  text-blue-300 hover:text-blue-400 transition-all duration-300"
        >
          Вернуться к входу
        </Link>
      </div>
    </form>
  );
}
