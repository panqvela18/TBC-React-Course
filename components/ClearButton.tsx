"use client";

import { handleClearCart } from "@/app/actions";
// import { useCart } from "@/app/providers/CartContext";
import React from "react";

export default function ClearButton() {
  // const { fetchCartData } = useCart();

  return (
    <button
      onClick={() => {
        handleClearCart();
      }}
      className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Clear Cart
    </button>
  );
}
