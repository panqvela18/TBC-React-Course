"use server";
// import { BASE_URL } from "@/constants";
import { cookies } from "next/headers";
import { PostData, Prod, UserData, blogData } from "./interface";
import { EditProfile, createBlog, createProduct, deleteBlogById, deleteProductById, editProduct, updateBlogById, updateUserById } from "./api";
import { revalidatePath } from "next/cache";
import { deleteUserById } from "@/app/api";
import { getUserId } from "./api";
import { ProfileData } from "@/components/ProfileInfo";
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
  const {title,description,user_id,image_url} = blogData
   revalidatePath("/blog")
   createBlog(title,description,user_id,image_url)
}
export async function createAddProductAction(productData: Prod) {
  const {title,
        description,
        image_url,
        price,
        category,
        discount,
        stock,
        user_id} = productData
   revalidatePath("/")
   createProduct(title,
        description,
        image_url,
        price,
        category,
        discount,
        stock,
        user_id)
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
        user_id} = productData
   revalidatePath("/")
   editProduct(id,
    title,
        description,
        image_url,
        price,
        category,
        discount,
        stock,
        user_id)
}


export async function editProfileInfo(formData: ProfileData) {
  const {name,nickname,email,userSub} = formData
   revalidatePath("/profile")
   EditProfile(name,nickname,email,userSub)
}



// Deletes

export const deleteUser: (id: number) => Promise<void> = async (id: number) => {
  await deleteUserById(id);
  revalidatePath("/admin");
};
export const deleteBlog: (id: number) => Promise<void> = async (id: number) => {
  await deleteBlogById(id);
  revalidatePath("/blog");
};
export const deleteProduct: (id: number) => Promise<void> = async (id: number) => {
  await deleteProductById(id);
  revalidatePath("/")
};

// Updates

export async function updateUserAction(id: number, userData: UserData) {
  const { name, email } = userData;
  revalidatePath("/admin");
  updateUserById(id, name, email);
}
export async function updateBlog( blog: PostData) {
  const {id, title,description,image_url } = blog;
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
