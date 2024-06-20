"use client";
import { editProfileInfo } from "@/app/actions";
import { useI18n } from "@/locales/client";
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

  const t = useI18n();

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
    <form
      className="text-gray-700 dark:text-gray-200 max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg"
      onSubmit={handleSubmit}
    >
      <table className="min-w-full">
        <tbody>
          <tr>
            <td className="border-b py-2 px-4 font-medium dark:border-gray-700">
              {t("name")}
            </td>
            <td className="border-b py-2 px-4 dark:border-gray-700">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-lg leading-6 h-10 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
              />
            </td>
          </tr>
          <tr>
            <td className="border-b py-2 px-4 font-medium dark:border-gray-700">
              {t("phone")}
            </td>
            <td className="border-b py-2 px-4 dark:border-gray-700">
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-lg leading-6 h-10 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
              />
            </td>
          </tr>
          <tr>
            <td className="border-b py-2 px-4 font-medium dark:border-gray-700">
              {t("Address")}
            </td>
            <td className="border-b py-2 px-4 dark:border-gray-700">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-lg leading-6 h-10 w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200"
              />
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">{t("email")}</td>
            <td className="py-2 px-4">
              <span className="opacity-75">{user?.email}</span>
            </td>
          </tr>
        </tbody>
      </table>
      {editProfileMessage && (
        <p className="mt-4 text-green-600 dark:text-green-400">
          {t("yourInfoIsUpdated")}
        </p>
      )}
      {errorMessage && (
        <p className="mt-4 text-red-500 dark:text-red-400">{errorMessage}</p>
      )}
      <button
        type="submit"
        className="mt-6 text-lg leading-6 h-10 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300"
      >
        {t("Update")}
      </button>
    </form>
  );
}
