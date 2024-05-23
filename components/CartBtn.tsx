// import { useCart } from "@/app/providers/CartContext";
import { getUserCart } from "@/app/api";
import { Cart } from "@/app/interface";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";

export default async function CartBtn() {
  // const { totalQuantity } = useCart();

  const cart: Cart = await getUserCart(32);
  const num = Object.values(cart.products);
  const totalQuantity = num.reduce((total: number, quantity: number) => {
    return total + quantity;
  }, 0);

  console.log(totalQuantity);

  return (
    <div className="relative mr-2">
      <IoMdCart className="text-3xl text-white" />
      <Link
        href="/cart"
        className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
      >
        {totalQuantity}
      </Link>
    </div>
  );
}
