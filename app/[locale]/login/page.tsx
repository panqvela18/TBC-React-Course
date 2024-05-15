import { cookies } from "next/headers";
import LoginForm from "../../../components/LoginForm";
import ToggleLang from "@/components/ToggleLang";

export default async function Login() {
  // if (cookies().has(AUTH_COOKIE_KEY)) {
  //   redirect("/");
  // }
  const cookie = cookies();
  const currentLang = cookie.get("Next-Locale");

  return (
    <div className="flex justify-center items-center h-screen">
      <ToggleLang currentLang={currentLang?.value} />
      <LoginForm />
    </div>
  );
}
