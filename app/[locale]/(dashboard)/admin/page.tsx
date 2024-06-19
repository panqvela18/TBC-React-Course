// pages/admin.tsx
import {
  Order,
  PostData,
  ProductFromVercel,
  Reviews,
  User,
} from "@/app/interface";
import {
  getContact,
  getOrders,
  getPosts,
  getProducts,
  getReviews,
  getUsers,
} from "@/app/api";
// import DarkModeToggle from "@/components/DarkModeToggle"; // Import the DarkModeToggle component
import DeleteUser from "@/components/DeleteUser";
import EditUser from "@/components/EditUser";
import AddNewBlog from "@/components/AddNewBlog";
import Image from "next/image";
import EditBlog from "@/components/EditBlog";
import DeleteBlog from "@/components/DeleteBlog";
import AddNewProduct from "@/components/AddNewProduct";
import EditProduct from "@/components/EditProduct";
import DeleteProduct from "@/components/DeleteProduct";
// import OrdersList from "@/components/OrdersList";
import DeleteContact from "@/components/DeleteContact";
import RefaundButton from "@/components/RefaundButton";

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
  const reviews = await getReviews();
  const contactInfo: ContactInfo[] = await getContact();

  return (
    <main className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-[4%] py-4">
        <div className="mt-8 overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 dark:text-white text-[#11545c]">
                  Name
                </th>
                <th className="px-4 py-2 dark:text-white text-[#11545c]">
                  Email
                </th>
                <th className="px-4 py-2 dark:text-white text-[#11545c]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr
                  key={user.id}
                  className="bg-white dark:bg-gray-800 rounded-md shadow-md mb-4"
                >
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
        <div className="overflow-x-auto">
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
                <tr
                  key={blog.id}
                  className="bg-white dark:bg-gray-800 rounded-md shadow-md mb-4"
                >
                  <td className="border px-4 py-2">
                    <Image
                      className="rounded object-cover select-none md:w-full"
                      src={blog.image_url ? blog.image_url : ""}
                      alt="contact-img"
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="border px-4 py-2">{blog.title}</td>
                  <td className="border px-4 py-2">{blog.description}</td>
                  <td className="px-4 py-2 border-t flex justify-center">
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
      </div>
      <div className="container mx-auto px-[4%] py-4">
        <AddNewProduct />
        <div className="overflow-x-auto">
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
                  className="bg-white dark:bg-gray-800 rounded-md shadow-md mb-4"
                >
                  <td className="border px-4 py-2">
                    <Image
                      className="rounded object-cover select-none md:w-full"
                      src={
                        product.image_gallery &&
                        product.image_gallery[0] &&
                        product.image_gallery[0].image_url
                          ? product.image_gallery[0].image_url
                          : ""
                      }
                      alt="contact-img"
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="border px-4 py-2 text-black dark:text-white">
                    {product.title}
                  </td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2">{product.price}</td>
                  <td className="border px-4 py-2">{product.category}</td>
                  <td className="border-t px-4 py-2 flex justify-center">
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
      </div>
      <div className="container mx-auto px-[4%] py-4">
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 dark:text-white">Total Price</th>
                <th className="px-4 py-2 dark:text-white">Status</th>
                <th className="px-4 py-2 dark:text-white">Address</th>
                <th className="px-4 py-2 dark:text-white">Phone</th>
                <th className="px-4 py-2 dark:text-white">Receipt</th>
                <th className="px-4 py-2 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: Order) => (
                <tr
                  key={order.latest_charge.id}
                  className="bg-white dark:bg-gray-800 rounded-md shadow-md mb-4"
                >
                  <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                    ${(order.amount / 100).toFixed(2)}
                  </td>
                  <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                    {order.latest_charge.refunded === true
                      ? "Refunded"
                      : "Paid"}
                  </td>
                  <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                    {order.metadata.address}
                  </td>
                  <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                    {order.metadata.phone}
                  </td>
                  <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                    <a
                      href={order.latest_charge.receipt_url}
                      aria-label="Order Receipt"
                      target="_blank"
                      className="text-red-600 dark:text-red-400 underline"
                      rel="noopener noreferrer"
                    >
                      View Receipt
                    </a>
                  </td>
                  <td className="border px-4 py-2 dark:border-gray-700 dark:text-white flex justify-center">
                    <RefaundButton
                      id={order.latest_charge.id}
                      refunded={order.latest_charge.refunded}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container mx-auto px-[4%] py-4">
        <h2 className="text-2xl font-semibold mb-4">Product Reviews</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Product Name</th>
                <th className="px-4 py-2">Star</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.reviews?.map((review: Reviews) => (
                <tr
                  key={review.review_id}
                  className="bg-white dark:bg-gray-800 rounded-md shadow-md mb-4"
                >
                  <td className="border px-4 py-2">{review.user_name}</td>
                  <td className="border px-4 py-2">{review.product_name}</td>
                  <td className="border px-4 py-2">{review.star}</td>
                  <td className="border px-4 py-2">{review.message}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    {/* <div className="flex items-center">
                      <DeleteContact id={contact.id} />
                    </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="container mx-auto px-[4%] py-4">
        <h2 className="text-2xl font-semibold mb-4">Contact Messages</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Surname</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactInfo?.map((contact) => (
                <tr
                  key={contact.id}
                  className="bg-white dark:bg-gray-800 rounded-md shadow-md mb-4"
                >
                  <td className="border px-4 py-2">{contact.name}</td>
                  <td className="border px-4 py-2">{contact.surname}</td>
                  <td className="border px-4 py-2">{contact.email}</td>
                  <td className="border px-4 py-2">{contact.message}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    <div className="flex items-center">
                      <DeleteContact id={contact.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
