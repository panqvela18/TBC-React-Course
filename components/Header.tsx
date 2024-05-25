import { cookies } from "next/headers";
import HeaderClient from "./HeaderClient";
// import { getSession } from "@auth0/nextjs-auth0";
export default async function Header() {
  // const session = await getSession();
  // const user = session?.user;
  // const isLoading=session?.isLoading;
  // const handleLogOut  = async ()=>{
  //   "use server"
  //   await logOut()

  //   // if (!cookies().has(AUTH_COOKIE_KEY)) {
  //   //   redirect("/");
  //   // }

  // }

  // const cookieStore = cookies()

  // const lng = cookieStore.get("lang")

  // console.log(lng)

  // const handleToggle = async (lang) =>{
  //   "use server"
  //   await langToggle(lang)
  // }

  const cookie = cookies();
  const currentLang = cookie.get("Next-Locale");
  return <HeaderClient currentLang={currentLang} />;
}
