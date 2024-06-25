"use client";

import { handleClearCart } from "@/app/actions";
import { useI18n } from "@/locales/client";
import React from "react";

export default function ClearButton() {
  const t = useI18n();
  return (
    <button
      onClick={() => {
        handleClearCart();
      }}
      className="mt-4 h-10 py-2 px-4 rounded font-bold w-[150px] text-white bg-red-500 hover:bg-red-600 mr-2"
    >
      {t("clearCart")}
    </button>
  );
}
