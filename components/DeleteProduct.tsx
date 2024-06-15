"use client";

import { deleteProduct } from "@/app/actions";
import { TiDelete } from "react-icons/ti";

export default function DeleteProduct({ id }: { id: number }) {
  return (
    <TiDelete
      className="cursor-pointer"
      color="red"
      fontSize={30}
      onClick={() => deleteProduct(id)}
    />
  );
}
