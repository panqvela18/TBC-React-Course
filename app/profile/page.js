"use client";
import Title from "@/components/Title";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";

export default function Page() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setPassword("");
      setConfirmPassword("");
    } else {
      setPasswordNotMatch(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordNotMatch(false);
    setPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setPasswordNotMatch(false);
    setConfirmPassword(e.target.value);
  };

  return (
    <main>
      <Title titleName="PROFILE" />
      <div className="px-[4%] pb-24 flex justify-center items-center">
        <CgProfile fontSize={256} className="mr-32 text-blue-300" />
        <div className="flex flex-col border p-4 rounded">
          <span>
            <strong>სახელი: </strong> ირაკლი
          </span>
          <span>
            <strong>გვარი: </strong> ფანქველაშვილი
          </span>
          <span>
            <strong>მეილი: </strong> test@gmail.com
          </span>
          <form className="flex flex-col" onSubmit={handleSavePassword}>
            <input
              value={password}
              onChange={handlePasswordChange}
              className="border outline-none p-2 my-3 text-blue-300 rounded"
              type="password"
              placeholder="ახალი პაროლი"
            />
            <input
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className=" border outline-none p-2 text-blue-300 rounded"
              type="password"
              placeholder="გაიმეორე პაროლი"
            />
            {passwordNotMatch && (
              <p className="text-red-300">Passwords do not match</p>
            )}
            <button className="bg-blue-500 p-4 mt-4 text-white cursor-pointer border rounded  font-bold transition duration-300 ease-in-out transform hover:bg-blue-200 hover:text-black hover:border hover:rounded hover:scale-105">
              SAVE
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
