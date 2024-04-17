
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { AUTH_COOKIE_KEY } from "@/constants";

export default function DashboardLayout({ children }) {
  const cookieStore = cookies()

  const cookie = cookieStore.get(AUTH_COOKIE_KEY)
  console.log(cookie)

  if(!cookie?.value){
    redirect("/login")
  }
  

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
