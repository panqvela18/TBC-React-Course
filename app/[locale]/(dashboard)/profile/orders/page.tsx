import { getOrders } from "@/app/api";
import { Order } from "@/app/interface";
import { getSession } from "@auth0/nextjs-auth0";
import { unstable_noStore as noStore } from "next/cache";

export default async function Orders() {
  const orders = await getOrders();

  const session = await getSession();
  const sub = session?.user?.sub;
  noStore();

  // Check if orders exist and filter by user's sub
  const userOrders =
    orders?.filter((order: Order) => order.metadata?.id === sub) || [];

  console.log(userOrders);

  return (
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
            </tr>
          </thead>
          <tbody>
            {userOrders.map((order: Order) =>
              // Check if latest_charge exists
              order.latest_charge ? (
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
                    {order.metadata?.address || "N/A"}
                  </td>
                  <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                    {order.metadata?.phone || "N/A"}
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
                </tr>
              ) : (
                <tr
                  key={order.id}
                  className="bg-white dark:bg-gray-800 rounded-md shadow-md mb-4"
                >
                  <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                    Missing order details
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}