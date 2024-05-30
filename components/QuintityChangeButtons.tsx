"use client";
import React from "react";
import {
  handleAddToCart,
  handleDecrement,
  handleRemoveProductFromCart,
} from "../app/actions";
// import { useCart } from "@/app/providers/CartContext";

export default function QuintityChangeButtons({ id }: { id: string }) {
  // const { fetchCartData } = useCart();

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => {
          handleDecrement(id);
        }}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-1 px-3 rounded"
      >
        -
      </button>

      <button
        onClick={() => {
          handleAddToCart(id);
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
