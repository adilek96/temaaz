import RegisterForm from "@/app/components/forms/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Создать аккаунт
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Уже есть аккаунт?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-300 hover:text-blue-400 transition-all duration-300"
          >
            Войти
          </Link>
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
