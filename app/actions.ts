"use server"
// import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";
import {  UserData, UserData1 } from "./interface";
import { createUser, updateUserById } from "./api";
import { revalidatePath } from "next/cache";
import { deleteUserById } from "@/app/api";



export async function langToggle(lang:string) {
  const cookieStore = cookies();
  cookieStore.set("lang", lang);
}

export async function createUserAction(userData: UserData1) {
  const {name,email,age,isAdmin} = userData
  revalidatePath("/admin")
   createUser(name,email,age,isAdmin)
}

export const deleteUser: (id: number) => Promise<void> = async (id: number) => {
  await deleteUserById(id);
  revalidatePath("/admin");
};

export async function updateUserAction(id:number,userData:UserData){
  const {name,email,age,isadmin} = userData
  revalidatePath("/admin")
  updateUserById(id,name,email,age,isadmin)

}