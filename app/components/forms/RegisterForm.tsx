"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { REGISTER_USER, VERIFY_EMAIL } from "@/app/graphql/mutations";
import { setTokens } from "@/app/lib/auth";

const registerSchema = z
  .object({
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    email: z.string().email("Введите корректный email"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Пароли не совпадают",
    path: ["passwordConfirmation"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerification, setShowVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const [register] = useMutation(REGISTER_USER, {
    onError: (error) => {
      console.error("GraphQL Error:", error);
      if (error.networkError) {
        setError(
          "Ошибка подключения к серверу. Проверьте, что сервер запущен."
        );
      } else if (error.graphQLErrors) {
        const message = error.graphQLErrors[0]?.message;
        if (message.includes("EMAIL_ALREADY_EXISTS")) {
          setError("Этот email уже зарегистрирован");
        } else if (message.includes("INVALID_EMAIL")) {
          setError("Неверный формат email");
        } else if (message.includes("PASSWORD_TOO_SHORT")) {
          setError("Пароль должен содержать минимум 6 символов");
        } else {
          setError(message || "Произошла ошибка при регистрации");
        }
      } else {
        setError("Произошла неизвестная ошибка");
      }
    },
  });

  const [verifyEmail] = useMutation(VERIFY_EMAIL, {
    onError: (error) => {
      console.error("Verification Error:", error);
      if (error.networkError) {
        setError(
          "Ошибка подключения к серверу. Проверьте, что сервер запущен."
        );
      } else if (error.graphQLErrors) {
        const message = error.graphQLErrors[0]?.message;
        if (message.includes("INVALID_VERIFICATION_CODE")) {
          setError("Неверный код подтверждения");
        } else if (message.includes("EMAIL_NOT_VERIFIED")) {
          setError("Email не подтвержден");
        } else {
          setError(message || "Произошла ошибка при подтверждении email");
        }
      } else {
        setError("Произошла неизвестная ошибка");
      }
    },
  });

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      console.log("Sending registration data:", {
        email: data.email,
        password: data.password,
        confirmPassword: data.passwordConfirmation,
        name: data.name,
      });

      const { data: response } = await register({
        variables: {
          email: data.email,
          password: data.password,
          confirmPassword: data.passwordConfirmation,
          name: data.name,
        },
      });

      console.log("Registration response:", response);

      if (response?.register) {
        setRegisteredEmail(data.email);
        setShowVerification(true);
        setSuccess("Регистрация успешна! Проверьте email для подтверждения.");
      }
    } catch (err: any) {
      if (err.networkError) {
        setError(
          "Ошибка подключения к серверу. Проверьте, что сервер запущен."
        );
      } else if (err.graphQLErrors) {
        const message = err.graphQLErrors[0]?.message;
        if (message.includes("EMAIL_ALREADY_EXISTS")) {
          setError("Этот email уже зарегистрирован");
        } else if (message.includes("INVALID_EMAIL")) {
          setError("Неверный формат email");
        } else if (message.includes("PASSWORD_TOO_SHORT")) {
          setError("Пароль должен содержать минимум 6 символов");
        } else {
          setError(message || "Произошла ошибка при регистрации");
        }
      } else {
        setError(err.message || "Произошла неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async () => {
    try {
      setLoading(true);
      setError("");
      setSuccess("");

      console.log("Отправка данных для верификации:", {
        email: registeredEmail,
        code: verificationCode,
      });

      const { data: response } = await verifyEmail({
        variables: {
          email: registeredEmail,
          code: verificationCode,
        },
      });

      console.log("Ответ сервера при верификации:", response);

      if (response?.verifyEmail?.success) {
        const { accessToken, refreshToken } = response.verifyEmail;
        console.log("Токены получены:", { accessToken, refreshToken });

        setTokens(accessToken, refreshToken);
        setSuccess("Email успешно подтвержден! Перенаправление...");

        setTimeout(() => {
          router.push("/feed");
        }, 1000);
      } else {
        const errorMessage =
          response?.verifyEmail?.message || "Ошибка подтверждения email";
        console.error("Ошибка верификации:", errorMessage);
        setError(errorMessage);
      }
    } catch (err: any) {
      if (err.networkError) {
        setError(
          "Ошибка подключения к серверу. Проверьте, что сервер запущен."
        );
      } else if (err.graphQLErrors) {
        const message = err.graphQLErrors[0]?.message;
        if (message.includes("INVALID_VERIFICATION_CODE")) {
          setError("Неверный код подтверждения");
        } else if (message.includes("EMAIL_NOT_VERIFIED")) {
          setError("Email не подтвержден");
        } else {
          setError(message || "Произошла ошибка при подтверждении email");
        }
      } else {
        setError(err.message || "Произошла неизвестная ошибка");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!showVerification ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 text-black"
        >
          <div className="space-y-2">
            <label htmlFor="name">Имя</label>
            <div className="relative">
              <FaUser className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
              <input
                id="name"
                type="text"
                placeholder="Иван Иванов"
                {...registerField("name")}
                className="py-1 px-7 ring-blockground/90 rounded-2xl w-full ring-2"
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
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
                {...registerField("email")}
                className="py-1 px-7 ring-blockground/90 rounded-2xl w-full ring-2"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
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
                {...registerField("password")}
                className="py-1 px-7 ring-blockground/90 rounded-2xl w-full ring-2"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword">Подтвердите пароль</label>
            <div className="relative">
              <FaLock className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...registerField("passwordConfirmation")}
                className="py-1 px-7 ring-blockground/90 rounded-2xl w-full ring-2"
                required
              />
              {errors.passwordConfirmation && (
                <p className="text-red-500 text-sm">
                  {errors.passwordConfirmation.message}
                </p>
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
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>
      ) : (
        <div className="space-y-6 text-black">
          <div className="space-y-2">
            <label htmlFor="verificationCode">Код подтверждения</label>
            <div className="relative">
              <input
                id="verificationCode"
                type="text"
                placeholder="Введите код из email"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="py-1 px-7 ring-blockground/90 rounded-2xl w-full ring-2"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            onClick={handleVerification}
            disabled={loading || !verificationCode}
            className="w-full bg-blockground/90 hover:bg-blockground/70 transition-all duration-300 py-2 rounded-2xl text-white hover:text-gray-400 disabled:opacity-50"
          >
            {loading ? "Подтверждение..." : "Подтвердить email"}
          </button>
        </div>
      )}
    </div>
  );
}
