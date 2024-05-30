import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookieStore = cookies()

  // const cookie = cookieStore.get(AUTH_COOKIE_KEY)
  // console.log(cookie)

  // if(!cookie?.value){
  //   redirect("/login")
  // }

  return (
    <div className="flex flex-col min-h-screen justify-between bg-white dark:bg-slate-900">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
