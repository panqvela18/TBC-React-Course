import { logOut } from "@/app/actions";
import HeaderClient from "./HeaderClient";
import { AUTH_COOKIE_KEY } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Header() {

  const handleLogOut  = async ()=>{
    "use server"
    await logOut()
    const cookieStore = cookies();
    const auth_cookie = cookieStore.get(AUTH_COOKIE_KEY);
    
    if(!auth_cookie?.value) {
      redirect("/login")
    }
  }
    

  return (
   <HeaderClient handleLogOut = {handleLogOut} />
  );
  
}
