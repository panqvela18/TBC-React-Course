"use client";

import React from "react";
import {
  handleAddToCart,
  handleDecrement,
  handleRemoveProductFromCart,
} from "../app/actions";
import { toast } from "react-toastify";
import { useI18n } from "@/locales/client";

export default function QuintityChangeButtons({ id }: { id: string }) {
  const t = useI18n();
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => {
          handleDecrement(id);
          toast.info(t("productRemovedFromCart"), {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
      >
        -
      </button>

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
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
      >
        +
      </button>
      <button
        onClick={() => {
          handleRemoveProductFromCart(id);
        }}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
      >
        Remove
      </button>
    </div>
  );
}
