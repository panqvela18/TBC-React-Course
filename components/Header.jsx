import { logOut } from "@/app/actions";
import HeaderClient from "./HeaderClient";
import { AUTH_COOKIE_KEY } from "@/constants";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Header() {

  // const handleLogOut  = async ()=>{
  //   "use server"
  //   await logOut()
    
  //   // if (!cookies().has(AUTH_COOKIE_KEY)) {
  //   //   redirect("/"); 
  //   // }
    
  // }
    

  return (
   <HeaderClient  />
  );
  
}
