"use client";
import { deleteReview } from "@/app/actions";
import React from "react";
import { TiDelete } from "react-icons/ti";

export default function DeleteReview({ id }: { id: number }) {
  return (
    <TiDelete
      className="cursor-pointer"
      color="red"
      fontSize={30}
      onClick={() => deleteReview(id)}
    />
  );
}
