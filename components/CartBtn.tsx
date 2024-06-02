// import Link from "next/link";
import Link from "next/link";
import { IoMdCart } from "react-icons/io";

export default async function CartBtn({
  totalQuantity,
}: {
  totalQuantity: number;
}) {
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
