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
      <IoMdCart className="text-3xl text-[#003049] dark:text-white" />
      <Link
        href="/cart"
        className="absolute top-0 right-0 bg-white border  text-[#003049] text-xs rounded-full w-4 h-4 flex items-center justify-center"
      >
        {totalQuantity}
      </Link>
    </div>
  );
}
