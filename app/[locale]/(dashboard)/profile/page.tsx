"use client";
import Title from "@/components/Title";
import { useUser } from "@auth0/nextjs-auth0/client";
// import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
interface IUserProfile {
  nickname?: string;
  family_name?: string;
  given_name?: string;
  email?: string;
  name?: string;
  picture?: string;
}
export default function Page() {
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const { user: rawUser } = useUser();
  const user = rawUser as IUserProfile;
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhdHVueTAiLCJlbWFpbCI6ImF0dW55MEBzb2h1LmNvbSIsImZpcnN0TmFtZSI6IlRlcnJ5IiwibGFzdE5hbWUiOiJNZWRodXJzdCIsImdlbmRlciI6Im1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vcm9ib2hhc2gub3JnL1RlcnJ5LnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcxMzQzODI2MiwiZXhwIjoxNzEzNDQxODYyfQ.787B1RriCi7-nWeSa-mqRt1t1WxJ8vnCcCACyGCptKQ";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("https://dummyjson.com/auth/me", {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (!res.ok) {
  //         throw new Error("Failed to fetch user data");
  //       }
  //       const user = await res.json();
  //       console.log(user);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Ensure this effect runs only once on component mount

  // const handleSavePassword = (e) => {
  //   e.preventDefault();
  //   if (password === confirmPassword) {
  //     setPassword("");
  //     setConfirmPassword("");
  //   } else {
  //     setPasswordNotMatch(true);
  //   }
  // };

  // const handlePasswordChange = (e) => {
  //   setPasswordNotMatch(false);
  //   setPassword(e.target.value);
  // };
  // const handleConfirmPasswordChange = (e) => {
  //   setPasswordNotMatch(false);
  //   setConfirmPassword(e.target.value);
  // };

  return (
    <main className="bg-white dark:bg-slate-900">
      <Title titleName="PROFILE" />
      <div className="px-[4%] pb-24 flex justify-center items-center">
        <CgProfile
          fontSize={256}
          className="mr-32 text-blue-300 dark:text-white"
        />
        <div className="flex border border-blue-500 p-4 rounded-lg gap-8 shadow-lg bg-white items-baseline">
          <div className="font-bold text-blue-500">
            {user.nickname && (
              <h3 className="text-xl  leading-6 h-8">Username</h3>
            )}
            {user.family_name && (
              <h3 className="text-xl  leading-6 h-8">Name</h3>
            )}
            {/* {user.name && <h3 className="text-xl  leading-6 h-8">Name</h3>} */}
            {user.given_name && (
              <h3 className="text-xl  leading-6 h-8">Surname</h3>
            )}
            {user.email && <h3 className="text-xl leading-6 h-8">Email</h3>}
          </div>
          <div className="text-gray-700">
            {user.nickname && (
              <p className="text-lg leading-6 h-8">{user.nickname}</p>
            )}
            {user.given_name && (
              <p className="text-lg leading-6 h-8">{user.given_name}</p>
            )}
            {user.family_name && (
              <p className="text-lg leading-6 h-8">{user.family_name}</p>
            )}
            {/* {user.name && <p className="text-lg leading-6 h-8">{user.name}</p>} */}

            {user.email && (
              <p className="text-lg leading-6 h-8">{user.email}</p>
            )}
          </div>
        </div>

        {/* <span>
            <strong>სახელი: </strong> {user.name}
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
              className="border outline-none p-2 my-3 text-blue-300 rounded dark:text-slate-50"
              type="password"
              placeholder="ახალი პაროლი"
            />
            <input
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className=" border outline-none p-2 text-blue-300 rounded dark:text-slate-50"
              type="password"
              placeholder="გაიმეორე პაროლი"
            />
            {passwordNotMatch && (
              <p className="text-red-300">Passwords do not match</p>
            )}
            <button className="bg-blue-500 p-4 mt-4 text-white cursor-pointer border rounded  font-bold transition duration-300 ease-in-out transform hover:bg-blue-200 hover:text-black hover:border hover:rounded hover:scale-105 dark:bg-white dark:text-black">
              SAVE
            </button>
          </form> */}
      </div>
      {/* </div> */}
    </main>
  );
}
