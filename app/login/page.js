"use server";
import LoginForm from "@/components/loginForm";
import { login } from "../actions";
import { AUTH_COOKIE_KEY } from "@/constants";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Login() {
  const cookieStore = cookies();
  const cookie = cookieStore.get(AUTH_COOKIE_KEY);
  if (cookie?.value) {
    redirect("/");
  }

  const handleLogin = async (username, password) => {
    "use server";
    await login(username, password);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm handleLogin={handleLogin} />
    </div>
  );
}
