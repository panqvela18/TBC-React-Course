"use client";

import { deleteContact } from "@/app/actions";
import { TiDelete } from "react-icons/ti";

export default function DeleteContact({ id }: { id: number }) {
  return (
    <TiDelete
      className="cursor-pointer"
      color="red"
      fontSize={30}
      onClick={() => deleteContact(id)}
    />
  );
}
