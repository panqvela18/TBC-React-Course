import React from "react";
import Title from "../components/Title";
import { CgProfile } from "react-icons/cg";

export default function Profile() {
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
          <input
            className="border outline-none p-2 my-3 text-blue-300 rounded"
            type="password"
            placeholder="ახალი პაროლი"
          />
          <input
            className=" border outline-none p-2 text-blue-300 rounded"
            type="password"
            placeholder="გაიმეორე პაროლი"
          />
          <button className="bg-blue-500 p-4 mt-4 text-white cursor-pointer border rounded  font-bold transition duration-300 ease-in-out transform hover:bg-blue-200 hover:text-black hover:border hover:rounded hover:scale-105">
            SAVE
          </button>
        </div>
      </div>
    </main>
  );
}
