"use client";
import { deleteUser } from "@/app/actions";
import { TiDelete } from "react-icons/ti";

interface DeleteUserProps {
  id: number;
}

export default function DeleteUser({ id }: DeleteUserProps) {
  return (
    <div>
      <TiDelete
        onClick={() => deleteUser(id)}
        className="cursor-pointer"
        color="red"
        fontSize={30}
      />
    </div>
  );
}
