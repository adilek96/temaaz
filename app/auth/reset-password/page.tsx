import PasswordResetForm from "@/app/components/forms/PasswordResetForm";
import Link from "next/link";

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Восстановление пароля
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Введите email для получения инструкций по восстановлению пароля
        </p>
      </div>
      <PasswordResetForm />
    </div>
  );
}
