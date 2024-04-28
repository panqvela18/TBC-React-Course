import LoginForm from "../../components/LoginForm";

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
