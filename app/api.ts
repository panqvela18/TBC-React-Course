import { getSession } from "@auth0/nextjs-auth0";

export async function getUsers() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + "/api/get-users", {
      cache: "no-store",
    }
  );
  const { users } = await response.json();
  return users?.rows;
}

export async function getProductDetail(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-products/${id}`, {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const product = data.products?.rows ? data.products.rows[0] : null;
  const reviews = data.reviews?.rows ? data.reviews.rows : null;
  const gallery = data.gallery?.rows ? data.gallery.rows : null;
  return {product,reviews,gallery};
}


export async function getBlogDetail(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-blogs/${id}`, {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const blogDetail = data.blogs?.rows ? data.blogs.rows[0] : null;
  
  return blogDetail;
}

export async function getProducts() {
  const response = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + "/api/get-products", {
      cache: "no-store",
    }
  );
  const { products } = await response.json();
  return products?.rows;
}

export async function getPosts(){
  const response = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + "/api/get-blogs", {
      cache: "no-store",
      
    }
  );
  const { blogs } = await response.json();
  return blogs?.rows;
}



export async function deleteUserById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-user/${id}`,
    {
      method: "DELETE",
      cache: "no-store",


    }
  );
}
export async function deleteBlogById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-blog/${id}`,
    {
      method: "DELETE",
      cache: "no-store",

    }
  );
}
export async function deleteProductById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-product/${id}`,
    {
      method: "DELETE",
      cache: "no-store",

    }
  );
}
export async function deleteContactById(id: number) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/delete-contact/${id}`,
    {
      method: "DELETE"
    }
  );
}

export async function updateUserById(id: number, name: string, email: string, image_url:string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/update-user/${id}`,
      {
        method: "PUT",
        cache: "no-store",

        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify({ name, email,image_url }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error);
    }

    return { success: true }; 
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
        cache: "no-store",
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
export async function createBlog(title:string,description:string,image_url:string | undefined) {

  return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/add-blog", {
    method: "POST",
    cache: "no-store",

    body: JSON.stringify({ title,description,image_url}),
  });
}
export async function createReview(user_id:number | undefined,
  product_id:number,
  rating:number,
  message:string,) {

  return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/add-review", {
    method: "POST",
    cache: "no-store",

    body: JSON.stringify({ user_id,
      product_id,
      rating,
      message}),
  });
}
export async function createContact(name:string,
  surname:string,
  email:string,
  message:string) {

  return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/add-contact", {
    method: "POST",
    cache: "no-store",

    body: JSON.stringify({ name,surname,email,message}),
  });
}
// export async function EditProfile(name:string,nickname:string,email:string,userSub:string) {

//   return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/edit-profileInfo", {
//     method: "POST",
//     body: JSON.stringify({name, nickname,email,userSub}),
//   });
// }
export async function createProduct(
  title: string,
  description: string,
  image_url: string,
  price: string,
  category: string,
  discount: number,
  stock: number,
  imageGallery: { id: number; image_url: string }[] | undefined
) {
  return await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/add-product`, {
    method: "POST",
    cache: "no-store",

    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      title,
      description,
      image_url,
      price,
      category,
      discount,
      stock,
      imageGallery,
    }),
  });
}
export async function editProduct(id:number | undefined,title:string,
  description:string,
  image_url:string,
  price:string,
  category:string,
  discount:number,
  stock:number,
  imageGallery:{ id: number; image_url: string }[] | undefined
  // user_id:number
) {

  return await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + `/api/update-product/${id}`, {
    method: "PUT",
    cache: "no-store",
    body: JSON.stringify({ 
      title,
      description,
      image_url,
      price,
      category,
      discount,
      stock,
      imageGallery
      // user_id
    }),
  });
}
export async function EditProfile(userSub: string, name: string, phone: string, address: string) {
  console.log(userSub, name, phone, address);

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_VERCEL_URL + "/api/edit-profileInfo", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
      body: JSON.stringify({
        userSub,
        name,
        phone,
        address,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Failed to update profile:", errorData);
      throw new Error("Failed to update profile");
    }

    return response.json();
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}




export async function getUserCart() {
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

export async function getUserInfo() {
  const id = await getUserId();
  const userSubId = await fetch(
    process.env.NEXT_PUBLIC_VERCEL_URL + `/api/get-users/${id}`,
    {
      cache: "no-store",
    }
  );

  const userInfo = await userSubId.json();
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
// export async function getUserRole(){
// const session = await getSession();
//   const user = session?.user;
//   const id = user?.sub;
//   const userRole = await fetch(
//     process.env.NEXT_PUBLIC_VERCEL_URL + `/api/get-user-role/${id}`,
//     {
//       cache: "no-store",
//     }
//   );
//   const userRoleInfo = await userRole.json();
//   return userRoleInfo.userImage.rows[0]?.role
// }


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
  console.log(userId)

  return userId;
}


export const getOrders = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/orders`, {
    cache: "no-store",
  });
  const orders = await res.json();
  return orders;
};
export const getContact = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/get-contact-info`, {
    cache: "no-store",
  });
  const contact = await res.json();
  return contact?.contacts?.rows;
};

