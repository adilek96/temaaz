"use client";

import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-black">
      <div className="space-y-2">
        <label htmlFor="name">Имя</label>
        <div className="relative">
          <FaUser className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          <input
            id="name"
            type="text"
            placeholder="Иван Иванов"
            className="py-1 px-7 ring-blockground/90 rounded-2xl w-full ring-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>

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
        <label htmlFor="password">Пароль</label>
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
        Зарегистрироваться
      </button>
    </form>
  );
}
