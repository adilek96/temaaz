"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/app/graphql/mutations";
import { setTokens } from "@/app/lib/auth";

const loginSchema = z.object({
  email: z.string().email("Введите корректный email"),
  password: z.string().min(1, "Введите пароль"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [login] = useMutation(LOGIN_USER, {
    onError: (error) => {
      console.error("GraphQL Error:", error);
      if (error.networkError) {
        setError(
          "Ошибка подключения к серверу. Проверьте, что сервер запущен."
        );
      } else if (error.graphQLErrors) {
        const message = error.graphQLErrors[0]?.message;
        if (message.includes("EMAIL_NOT_VERIFIED")) {
          setError("Пожалуйста, подтвердите ваш email");
        } else if (message.includes("UNAUTHORIZED")) {
          setError("Неверный email или пароль");
        } else {
          setError(message || "Произошла ошибка при входе");
        }
      } else {
        setError("Произошла неизвестная ошибка");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      console.log("Sending login data:", {
        email: data.email,
        password: data.password,
      });

      const { data: response } = await login({
        variables: {
          email: data.email,
          password: data.password,
        },
      });

      console.log("Login response:", response);

      if (response?.login) {
        const { accessToken, refreshToken } = response.login;
        setTokens(accessToken, refreshToken);

        setSuccess("Вход выполнен успешно! Перенаправление...");
        router.push("/feed");
      }
    } catch (err: any) {
      if (err.networkError) {
        setError(
          "Ошибка подключения к серверу. Проверьте, что сервер запущен."
        );
      } else if (err.graphQLErrors) {
        const message = err.graphQLErrors[0]?.message;
        if (message.includes("INVALID_CREDENTIALS")) {
          setError("Неверный email или пароль");
        } else if (message.includes("EMAIL_NOT_VERIFIED")) {
          setError("Email не подтвержден");
        } else {
          setError(message || "Произошла ошибка при входе");
        }
      } else {
        setError(err.message || "Произошла неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      <div className="space-y-2">
        <label htmlFor="email">Email</label>
        <div className="relative">
          <MdEmail className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
          <input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className="py-1 px-7 ring-blockground/90 rounded-2xl w-full ring-2"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
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
            {...register("password")}
            className="py-1 px-7 ring-blockground/90 rounded-2xl w-full ring-2"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blockground/90 hover:bg-blockground/70 transition-all duration-300 py-2 rounded-2xl text-white hover:text-gray-400 disabled:opacity-50"
      >
        {loading ? "Вход..." : "Войти"}
      </button>
    </form>
  );
}
