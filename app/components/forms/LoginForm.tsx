"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
      <div className="space-y-2">
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

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password">Пароль</label>
          <Link
            href="/auth/reset-password"
            className="text-sm font-medium text-blockground/90 hover:text-blockground/70 transition-all duration-300"
          >
            Забыли пароль?
          </Link>
        </div>
        <div className="relative">
          <FaLock className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="py-1 px-7 ring-blockground/90 rounded-2xl w-full ring-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blockground/90 hover:bg-blockground/70 transition-all duration-300 py-2 rounded-2xl text-white hover:text-gray-400"
      >
        Войти
      </button>
    </form>
  );
}
