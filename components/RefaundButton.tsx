"use client";
import { createRefund } from "@/app/actions";
import React from "react";

export default function RefaundButton({
  id,
  refunded,
}: {
  id: string;
  refunded: boolean;
}) {
  const refundHandler = async (charge: string) => {
    await createRefund(charge);
  };
  return (
    <>
      {refunded === false && (
        <button
          onClick={() => refundHandler(id)}
          type="button"
          className="p-1 px-[25px] border border-solid border-red-600 dark:border-red-400 text-[18px] text-black dark:text-white font-medium align-middle duration-300 uppercase flex items-center justify-center gap-2 bg-red-600 dark:bg-red-400 hover:bg-red-500 dark:hover:bg-red-300 w-[150px]"
        >
          Refund
        </button>
      )}
    </>
  );
}
