"use client";

import { useState } from "react";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "@/app/graphql/mutations";

const resetPasswordSchema = z.object({
  email: z.string().email("Введите корректный email"),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function PasswordResetForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onError: (error) => {
      console.error("GraphQL Error:", error);
      if (error.networkError) {
        setError(
          "Ошибка подключения к серверу. Проверьте, что сервер запущен."
        );
      } else if (error.graphQLErrors) {
        const message = error.graphQLErrors[0]?.message;
        if (message.includes("USER_NOT_FOUND")) {
          setError("Пользователь с таким email не найден");
        } else {
          setError(message || "Произошла ошибка при сбросе пароля");
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
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      console.log("Sending reset password data:", {
        email: data.email,
      });

      const { data: response } = await resetPassword({
        variables: {
          email: data.email,
        },
      });

      console.log("Reset password response:", response);

      if (response?.resetPassword?.success) {
        setSuccess("Инструкции по сбросу пароля отправлены на ваш email");
      } else {
        setError(response?.resetPassword?.message || "Ошибка сброса пароля");
      }
    } catch (err: any) {
      if (err.networkError) {
        setError(
          "Ошибка подключения к серверу. Проверьте, что сервер запущен."
        );
      } else if (err.graphQLErrors) {
        const message = err.graphQLErrors[0]?.message;
        if (message.includes("USER_NOT_FOUND")) {
          setError("Пользователь с таким email не найден");
        } else {
          setError(message || "Произошла ошибка при сбросе пароля");
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

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blockground/90 hover:bg-blockground/70 transition-all duration-300 py-2 rounded-2xl text-white hover:text-gray-400 disabled:opacity-50"
      >
        {loading ? "Отправка..." : "Сбросить пароль"}
      </button>

      <div className="text-center">
        <Link
          href="/auth/login"
          className="text-sm font-medium text-blue-300 hover:text-blue-400 transition-all duration-300"
        >
          Вернуться к входу
        </Link>
      </div>
    </form>
  );
}
