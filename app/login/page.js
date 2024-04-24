import LoginForm from "@/components/loginForm";
import moon from "../../public/moon.svg";
import sun from "../../public/sun.svg";

export default async function Login() {
  // if (cookies().has(AUTH_COOKIE_KEY)) {
  //   redirect("/");
  // }

  return (
    <div className="flex justify-center items-center h-screen">
      <LoginForm />
    </div>
  );
}
