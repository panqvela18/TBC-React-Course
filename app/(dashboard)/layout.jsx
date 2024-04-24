
import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function DashboardLayout({ children }) {
  // const cookieStore = cookies()

  // const cookie = cookieStore.get(AUTH_COOKIE_KEY)
  // console.log(cookie)

  // if(!cookie?.value){
  //   redirect("/login")
  // }
  

  return (
    <div suppressHydrationWarning={true}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
