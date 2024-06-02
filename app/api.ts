import { getSession } from "@auth0/nextjs-auth0";
import { formData } from "./interface";

export async function getUsers() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + "/api/get-users"
  );
  const { users } = await response.json();
  return users?.rows;
}

export async function getProductDetail(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-products/${id}`
  );
  const data = await response.json();
  const product = data.products?.rows ? data.products.rows[0] : null;
  return product;
}

export async function getProducts() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + "/api/get-products"
  );
  const { products } = await response.json();
  return products?.rows;
}

export async function getPosts(){
  const response = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + "/api/get-blogs"
  );
  const { blogs } = await response.json();
  return blogs?.rows;
}



export async function deleteUserById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-user/${id}`,
    {
      method: "DELETE",
    }
  );
}
export async function deleteBlogById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-blog/${id}`,
    {
      method: "DELETE",
    }
  );
}
export async function deleteProductById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-product/${id}`,
    {
      method: "DELETE"
    }
  );
}

export async function updateUserById(id: number, name: string, email: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/update-user/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return { success: true }; // Return success indicator
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
export async function updateBlogById(id:number,title:string,description:string,image_url:string | undefined) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/update-blog/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title,description,image_url }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return { success: true }; // Return success indicator
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
// export async function updateProductById(id:number,title:string,description:string,image_url:string | undefined) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/update-product/${id}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ title,description,image_url }),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error);
//     }

//     return { success: true }; // Return success indicator
//   } catch (error) {
//     console.error("Error updating user:", error);
//     throw error;
//   }
// }

// export async function createUser() {
//   const session = await getSession();
//   const user = session?.user;

//   const name = user?.nickname;
//   const id = user?.sid;
//   const email = user?.email;
//   const img = user?.picture;

//   return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/create-user", {
//     method: "POST",
//     body: JSON.stringify({ id, name, email, img }),
//   });
// }
export async function createBlog(title:string,description:string,user_id:number,image_url:string | undefined) {

  return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/add-blog", {
    method: "POST",
    body: JSON.stringify({ title,description,user_id,image_url}),
  });
}
export async function createContact(formData:formData) {
  const {name,surname,email,message}=formData

  return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/add-contact", {
    method: "POST",
    body: JSON.stringify({ name,surname,email,message}),
  });
}
// export async function EditProfile(name:string,nickname:string,email:string,userSub:string) {

//   return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/edit-profileInfo", {
//     method: "POST",
//     body: JSON.stringify({name, nickname,email,userSub}),
//   });
// }
export async function createProduct(title:string,
  description:string,
  image_url:string,
  price:string,
  category:string,
  discount:number,
  stock:number,
  user_id:number) {

  return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/add-product", {
    method: "POST",
    body: JSON.stringify({ title,
      description,
      image_url,
      price,
      category,
      discount,
      stock,
      user_id}),
  });
}
export async function editProduct(id:number | undefined,title:string,
  description:string,
  image_url:string,
  price:string,
  category:string,
  discount:number,
  stock:number,
  user_id:number) {

  return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/update-product/${id}`, {
    method: "PUT",
    body: JSON.stringify({ 
      title,
      description,
      image_url,
      price,
      category,
      discount,
      stock,
      user_id}),
  });
}
export async function EditProfile(name:string,nickname:string,email:string,userSub:string) {

  return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/edit-profileInfo", {
    method: "POST",
    body: JSON.stringify({name, nickname,email,userSub}),
  });
}



export async function getUserCart() {
  // const session = await getSession();
  // const user = session?.user;
  // const id = user?.sub;
  // console.log("sub", id);
  const userSubId = await getUserId()

  if (!userSubId) {
    return null;
  }
  const response = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/get-cart/${userSubId}`,
    {
      cache: "no-store",
    }
  );
  const carts = await response.json();
  // console.log(carts);

  const [cart] = carts.carts.rows;

  return cart;
}
export async function getUserId() {
  const session = await getSession();
  const user = session?.user;
  const id = user?.sub;
  const userSubId = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/getId/${id}`,
    {
      cache: "no-store",
    }
  );
  const userSerialId = await userSubId.json();
  const userId = userSerialId.usersId;

  return userId;
}
export async function getUserInfo() {
  const session = await getSession();
  const user = session?.user;
  const id = user?.sub;
  const userSubId = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/get-users/${id}`,
    {
      cache: "no-store",
    }
  );

  
  const userInfo = await userSubId.json();
  // console.log(userSerialId)
  const userDetail = userInfo.user.rows[0];
  return userDetail

}

export async function getUserImage(){
const session = await getSession();
  const user = session?.user;
  const id = user?.sub;
  const userImage = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/get-user-image/${id}`,
    {
      cache: "no-store",
    }
  );
  const userImageInfo = await userImage.json();
  const imageUrl = userImageInfo.userImage.rows[0].image_url
  return imageUrl
 
}
export async function getUserRole(){
const session = await getSession();
  const user = session?.user;
  const id = user?.sub;
  const userRole = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/get-user-role/${id}`,
    {
      cache: "no-store",
    }
  );
  const userRoleInfo = await userRole.json();
  return userRoleInfo.userImage.rows[0]?.role
}
