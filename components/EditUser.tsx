"use client";
import { CiEdit } from "react-icons/ci";
import { useState } from "react";
import { Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { updateUserAction } from "@/app/actions";

interface UserData {
  name: string;
  email: string;
  age: number;
  isadmin: boolean;
}

export default function EditUser({
  id,
  userData,
}: {
  id: number;
  userData: UserData;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<UserData>(userData);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserAction(id, user);
      console.log("User updated successfully");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
    router.refresh();
    handleClose();
  };

  const handleChange = (
    field: keyof UserData,
    value: string | number | boolean
  ) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <div>
      <CiEdit
        className="cursor-pointer mr-3"
        onClick={handleOpen}
        fontSize={30}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              value={user.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={user.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="age"
              type="number"
              placeholder="Age"
              value={user.age.toString()}
              onChange={(e) => handleChange("age", parseInt(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="isAdmin"
              checked={user?.isadmin}
              onChange={(e) => handleChange("isadmin", e.target.checked)}
            />
            <label
              className="text-gray-700 text-sm font-bold mb-2"
              htmlFor="isAdmin"
            >
              Admin
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
