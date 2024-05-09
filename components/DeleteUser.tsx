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
        className="cursor-pointer"
        onClick={() => deleteUser(id)}
        color="red"
        fontSize={30}
      />
    </div>
  );
}
