"use client";
import { editProfileInfo } from "@/app/actions";
import { useState } from "react";

export interface ProfileData {
  userSub: string;
  name: string;
  phone: string;
  address: string;
}

export default function ProfileInfo({ user }: { user: any }) {
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [editProfileMessage, setEditProfileMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const userSub = user?.sub;

  console.log(userSub);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: ProfileData = {
      userSub,
      name,
      phone,
      address,
    };
    console.log(formData);
    try {
      await editProfileInfo(formData);
      setEditProfileMessage(true);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <form className="text-gray-700" onSubmit={handleSubmit}>
      <table className="min-w-full bg-white">
        <tbody>
          <tr>
            <td className="border px-4 py-2">Name</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg leading-6 h-8"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Phone</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-lg leading-6 h-8"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Address</td>
            <td className="border px-4 py-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-lg leading-6 h-8"
              />
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Email</td>
            <td className="border px-4 py-2">
              <span className="opacity-50">{user?.email}</span>
            </td>
          </tr>
        </tbody>
      </table>
      {editProfileMessage && <p>Profile updated successfully</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button
        type="submit"
        className="text-lg leading-6 h-8 mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}
