"use server";
// import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";
import { PostData, Prod, UserData, blogData, reviewData } from "./interface";
import { EditProfile, createBlog, createContact, createProduct, createReview, deleteBlogById, deleteContactById, deleteProductById, editProduct, updateBlogById, updateUserById } from "./api";
import { revalidatePath } from "next/cache";
import { deleteUserById } from "@/app/api";
import { getUserId } from "./api";
import { ProfileData } from "@/components/ProfileInfo";
import {  ContactInfo1 } from "./[locale]/(dashboard)/admin/page";

export async function langToggle(lang: string) {
  const cookieStore = cookies();
  cookieStore.set("lang", lang);
}

// export async function createUserAction(userData: UserData1) {
//   const {name,email} = userData
//    revalidatePath("/admin")
//    createUser(name,email)
// }
export async function createAddBlogAction(blogData: blogData) {
  const {title,description,image_url} = blogData
   revalidatePath("/blog")
   revalidatePath("/admin")
   createBlog(title,description,image_url)
}
export async function createContactAction(formData: ContactInfo1) {
  const {name,
    surname,
    email,
    message} = formData
   revalidatePath("/admin")
   createContact(name,
    surname,
    email,
    message)
}
export async function createAddReviewAction(reviewData: reviewData) {
  const {user_id,
      product_id,
      rating,
      message} = reviewData
   revalidatePath(`/product/${product_id}`)
   createReview(user_id,
      product_id,
      rating,
      message)
}
export async function createAddProductAction(productData: Prod) {
  const {
    title,
    description,
    image_url,
    price,
    category,
    discount,
    stock,
    imageGallery,
  } = productData;

  await createProduct(
    title,
    description,
    image_url,
    price,
    category,
    discount,
    stock,
    imageGallery
  );
}
export async function editProductAction(productData: Prod) {
  const {
     id, 
    title,
        description,
        image_url,
        price,
        category,
        discount,
        stock,
        imageGallery
        // user_id
      } = productData
   revalidatePath("/product")
   revalidatePath("/admin")
   editProduct(id,
    title,
        description,
        image_url,
        price,
        category,
        discount,
        stock,
        imageGallery
        // user_id
      )
}


export async function editProfileInfo(formData: ProfileData) {
  const { userSub, name, phone, address } = formData;
  console.log(formData);

  try {
    await EditProfile(userSub, name, phone, address);
    revalidatePath("/profile");
  } catch (error) {
    console.error("Error in editProfileInfo:", error);
    throw error;
  }
}




// Deletes

export const deleteUser: (id: number) => Promise<void> = async (id: number) => {
  await deleteUserById(id);
  revalidatePath("/admin");
};
export const deleteBlog: (id: number) => Promise<void> = async (id: number) => {
  await deleteBlogById(id);
  revalidatePath("/admin");
  revalidatePath("/blog");
};
export const deleteProduct: (id: number) => Promise<void> = async (id: number) => {
  await deleteProductById(id);
  revalidatePath("/product")
  revalidatePath("/admin")
};
export const deleteContact: (id: number) => Promise<void> = async (id: number) => {
  await deleteContactById(id);
  revalidatePath("/admin")
};

// Updates

export async function updateUserAction(id: number, user: UserData) {
  const { name, email,image_url } = user;
  revalidatePath("/admin");
  updateUserById(id, name, email,image_url);
}
export async function updateBlog( blog: PostData) {
  const {id, title,description,image_url } = blog;
  revalidatePath("/admin");
  revalidatePath("/blog");
  updateBlogById(id,title,description,image_url);
}
// export async function updateProduct( product: Prod) {
//   const {id, title,description,image_url } = product;
//   revalidatePath("/product");
//   updateProductById(id,title,description,image_url);
// }

export const handleAddToCart = async (productId: string) => {
  "use server";

  const userId = await getUserId();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/add-product-to-cart`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          quantity: 1,
        }),
      }
    );
    revalidatePath("/cart");
    if (!response.ok) {
      throw new Error("Failed to add item to cart");
    }
  } catch (error) {
    console.error("Error adding item to cart:", error);
  }
};

export const handleDecrement = async (productId: string) => {
  "use server";
  const userId = await getUserId();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/decrement-product`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
          quantity: 1,
        }),
      }
    );

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
  const userId = await getUserId();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/remove-product-from-cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          productId: productId,
        }),
      }
    );

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
  const userId = await getUserId();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/clear-cart`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    revalidatePath("/cart");

    if (!response.ok) {
      throw new Error("Failed to clear cart");
    }
  } catch (error) {
    console.error("Error clearing cart:", error);
  }
};



// export const storeThemeInCookies = (pref: string) => {
//   if (pref === "os") {
//     cookies().delete("theme");
//   } else {
//     cookies().set("theme", pref, { secure: true, sameSite: "none" });
//   }
// };

// // General
// export const readCookieForClient = async (searchCookie: string) => {
//   return cookies().get(searchCookie)?.value;
// };

export async function createRefund(charge: string) {
  revalidatePath("/admin");
  await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/create-refund", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ charge }),
  });
}