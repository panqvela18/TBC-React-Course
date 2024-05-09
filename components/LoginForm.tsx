"use client";
import { handleLogin } from "../app/scripts/login";
import React, { FormEvent, useState } from "react";
import { useI18n } from "@/locales/client";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [required, setRequired] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setRequired(true);
    } else {
      handleLogin(username, password).then(() => {
        window.location.reload();
      });
    }
  };

  const t = useI18n();

  return (
    <>
      {/* <ToggleLang /> */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 dark:bg-black"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            {t("username")}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-gray-400"
            id="username"
            type="text"
            placeholder={t("username")}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setRequired(false);
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            {t("password")}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setRequired(false);
            }}
          />
          {required && (
            <p className="text-red-500">Username and password are required</p>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-slate-100 dark:text-slate-800"
          >
            {t("login")}
          </button>
        </div>
      </form>
    </>
  );
}
