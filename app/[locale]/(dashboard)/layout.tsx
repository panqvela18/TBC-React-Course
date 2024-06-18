// import { getUserCart } from "@/app/api";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
// import { CartOptimisticContextProvider } from "@/providers/CartOptimisticProvider";

export default async function DashboardLayout({
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
  // const cart = await getUserCart();

  return (
    <>
      {/* <CartOptimisticContextProvider cart={cart}> */}
      <div className="flex flex-col min-h-screen justify-between bg-[#adb5bd] dark:bg-slate-900">
        <Header />
        {children}
        <Footer />
      </div>
      {/* </CartOptimisticContextProvider> */}
    </>
  );
}
