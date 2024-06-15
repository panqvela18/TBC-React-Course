import { PostData, ProductFromVercel, User } from "@/app/interface";
import {
  getContact,
  getOrders,
  getPosts,
  getProducts,
  getUsers,
} from "@/app/api";
// import AddNewUser from "@/components/AddNewUser";
import DeleteUser from "@/components/DeleteUser";
import EditUser from "@/components/EditUser";
import AddNewBlog from "@/components/AddNewBlog";
import Image from "next/image";
import EditBlog from "@/components/EditBlog";
import DeleteBlog from "@/components/DeleteBlog";
import AddNewProduct from "@/components/AddNewProduct";
import EditProduct from "@/components/EditProduct";
import DeleteProduct from "@/components/DeleteProduct";
import OrdersList from "@/components/OrdersList";

export interface ContactInfo {
  id: number;
  name: string;
  surname: string;
  email: string;
  message: string;
}
export interface ContactInfo1 {
  name: string;
  surname: string;
  email: string;
  message: string;
}

export const metadata = {
  title: "Admin Portal",
  description: "Admin by Next",
};

export default async function Admin() {
  const users = await getUsers();
  const postData: PostData[] = await getPosts();
  const products: ProductFromVercel[] = await getProducts();
  const orders = await getOrders();
  const contactInfo: ContactInfo[] = await getContact();

  console.log(contactInfo);

  return (
    <main>
      <div className="container mx-auto px-[4%] py-4">
        {/* <AddNewUser /> */}
        <div className="mt-8">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr
                  key={user.id}
                  className="bg-white rounded-md shadow-md mb-4"
                >
                  <td className="border px-4 py-2">
                    <Image
                      className="rounded object-cover select-none  md:w-full"
                      src={user.image_url ? user.image_url : ""}
                      alt="contact-img"
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    <div className="flex items-center">
                      <EditUser user={user} id={user.id} />
                      <DeleteUser id={user.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container mx-auto px-[4%] py-4">
        <AddNewBlog />
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {postData.map((blog: PostData) => (
              <tr key={blog.id} className="bg-white rounded-md shadow-md mb-4">
                <td className="border px-4 py-2">
                  <Image
                    className="rounded object-cover select-none  md:w-full"
                    src={blog.image_url ? blog.image_url : ""}
                    alt="contact-img"
                    width={50}
                    height={50}
                  />
                </td>
                <td className="border px-4 py-2">{blog.title}</td>
                <td className="border px-4 py-2">{blog.description}</td>
                <td className="border px-4 py-2 flex justify-center">
                  <div className="flex items-center">
                    <EditBlog blogData={blog} />
                    <DeleteBlog id={blog.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container mx-auto px-[4%] py-4">
        <AddNewProduct />
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: ProductFromVercel) => (
              <tr
                key={product.id}
                className="bg-white rounded-md shadow-md mb-4"
              >
                <td className="border px-4 py-2">
                  <Image
                    className="rounded object-cover select-none  md:w-full"
                    src={product.image_url ? product.image_url : ""}
                    alt="contact-img"
                    width={50}
                    height={50}
                  />
                </td>
                <td className="border px-4 py-2 text-black ">
                  {product.title}
                </td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2">{product.price}</td>
                <td className="border px-4 py-2">{product.category}</td>
                <td className="border px-4 py-2 flex justify-center">
                  <div className="flex items-center">
                    <EditProduct product={product} />
                    <DeleteProduct id={product.id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <OrdersList orders={orders} />

      <div className="container mx-auto px-[4%] py-4">
        <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Surname</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {contactInfo?.map((contact) => (
              <tr
                key={contact.id}
                className="bg-white rounded-md shadow-md mb-4"
              >
                <td className="border px-4 py-2">{contact.name}</td>
                <td className="border px-4 py-2">{contact.surname}</td>
                <td className="border px-4 py-2">{contact.email}</td>
                <td className="border px-4 py-2">{contact.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
