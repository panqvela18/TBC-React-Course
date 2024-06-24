"use client";
import { handleAddToCart } from "@/app/actions";
import { useI18n } from "@/locales/client";
import React from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { toast } from "react-toastify";

export default function AddToCartButton({ id }: { id: string }) {
  const t = useI18n();

  return (
    <button
      onClick={() => {
        handleAddToCart(id);
        toast.success(t("productAddedToCart"), {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }}
      className="mt-2 bg-[#11545c] hover:bg-[#11545c] text-white flex items-center justify-center py-2 px-4 rounded font-bold transition-colors duration-300"
    >
      {t("addToCart")}
      <BsCartCheckFill className="ml-3" color="white" />
    </button>
  );
}
