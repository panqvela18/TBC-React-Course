"use client";
import { ProductData } from "@/app/interface";
import { useI18n } from "@/locales/client";
import Image from "next/image";
import Link from "next/link";
import { BsCartCheckFill } from "react-icons/bs";

export default function Product({
  prod,
  handleClick,
}: {
  prod: ProductData;
  handleClick: (id: number) => void;
}) {
  const { id, thumbnail, title, description, price } = prod;

  const t = useI18n();

  return (
    <div className="flex justify-between bg-white rounded flex-col items-center filter drop-shadow-xl py-2 dark:bg-black">
      <div className="relative h-40 w-40">
        <Image
          src={thumbnail}
          alt="productimage"
          className="w-auto h-40 object-cover"
          width={160}
          height={80}
        />
      </div>
      <div className="flex justify-center items-center flex-col p-3">
        <h5 className="text-black font-bold text-xl mb-2 dark:text-slate-200">
          {title}
        </h5>
        <p className="text-gray-400 font-medium mb-2 dark:text-white">
          {`${description.split(" ").slice(0, 10).join(" ")}`} ...
        </p>
        <span className="text-black font-bold text-xl dark:text-white ">
          {price}$
        </span>
      </div>
      <button
        onClick={() => handleClick(id)}
        className="bg-blue-500 text-white flex items-center py-2 px-4 rounded font-bold"
      >
        Add to Cart <BsCartCheckFill className="ml-3" color="white" />
      </button>
      <button className="bg-blue-500 text-white flex items-center py-2 px-4 rounded font-bold dark:bg-white dark:text-black">
        <Link href={`/product/${id}`}>{t("learnMore")}</Link>
      </button>
    </div>
  );
}
