"use client";

import { handleClearCart } from "@/app/actions";
import React from "react";

export default function ClearButton() {
  return (
    <button
      onClick={() => handleClearCart()}
      className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
    >
      Clear Cart
    </button>
  );
}
