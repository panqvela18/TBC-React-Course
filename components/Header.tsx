import { cookies } from "next/headers";
import HeaderClient from "./HeaderClient";
import { getSession } from "@auth0/nextjs-auth0";
import { Cart } from "@/app/interface";
import { getUserCart } from "@/app/api";
export default async function Header() {
  const session = await getSession();
  const user = session?.user;

  const cart: Cart = await getUserCart(43);
  const num = Object.values(cart.products);
  const totalQuantity = num.reduce((total: number, quantity: number) => {
    return total + quantity;
  }, 0);

  console.log(totalQuantity);

  const cookie = cookies();
  const currentLang = cookie.get("Next-Locale");
  return (
    <HeaderClient
      currentLang={currentLang}
      user={user}
      totalQuantity={totalQuantity}
    />
  );
}
