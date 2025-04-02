import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import LoginForm from "@/app/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Добро пожаловать
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Войдите в свой аккаунт или {"\u00A0"}
          <Link
            href="/auth/register"
            className="font-medium text-blue-300 hover:text-blue-400 transition-all duration-300"
          >
            создайте новый
          </Link>
        </p>
      </div>

      <LoginForm />

      <div className="relative">
        <div className="absolute inset-0 flex items-center"></div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">
            или продолжить через
          </span>
        </div>
      </div>

      <div className="flex w-full justify-center gap-2 text-blockground/90 hover:text-blockground/70 transition-all duration-300">
        <form
        // action={async () => {
        //   "use server";
        //   await signIn("google", { redirectTo: "/feed" });
        // }}
        >
          <button type="submit" className="">
            <FaGoogle className="mr-2 h-7 w-7 " />
          </button>
        </form>
        <form
        // action={async () => {
        //   "use server";
        //   await signIn("google", { redirectTo: "/feed" });
        // }}
        >
          <button type="submit" className="">
            <FaFacebook className="mr-2 h-7 w-7" />
          </button>
        </form>
      </div>
    </div>
  );
}
