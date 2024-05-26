"use server"
// import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";
import {  UserData } from "./interface";
import {  updateUserById } from "./api";
import { revalidatePath } from "next/cache";
import { deleteUserById } from "@/app/api";



export async function langToggle(lang:string) {
  const cookieStore = cookies();
  cookieStore.set("lang", lang);
}

// export async function createUserAction(userData: UserData1) {
//   const {name,email} = userData
//    revalidatePath("/admin")
//    createUser(name,email)
// }

export const deleteUser: (id: number) => Promise<void> = async (id: number) => {
  await deleteUserById(id);
  revalidatePath("/admin");
};

export async function updateUserAction(id:number,userData:UserData){
  const {name,email} = userData
  revalidatePath("/admin")
  updateUserById(id,name,email)

}

export const handleAddToCart = async (productId: string) => {
  "use server";
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/add-product-to-cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 43,
        productId: productId,
        quantity: 1,
      }),
    });
    revalidatePath("/cart")
    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

export const handleDecrement = async (productId: string) => {
  "use server";
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/decrement-product`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 43,
        productId: productId,
        quantity: 1,
      }),
    });

    revalidatePath("/cart");

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

export const handleRemoveProductFromCart = async (productId: string) => {
  "use server";
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/remove-product-from-cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 43, 
        productId: productId,
      }),
    });

    revalidatePath("/cart");

    if (!response.ok) {
      throw new Error("Failed to remove item from cart");
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};


export const handleClearCart = async () => {
  "use server";
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/clear-cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: 43, 
      }),
    });

    revalidatePath("/cart");

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};
