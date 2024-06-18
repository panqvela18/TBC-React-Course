"use client";

import { createRefund } from "../app/actions";

const OrdersList = ({ orders }: any) => {
  const refundHandler = async (charge: string) => {
    await createRefund(charge);
  };

  console.log(orders);

  return (
    <div className="container mx-auto px-[4%] py-4">
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
          {orders.map((order: any) => (
            <tr
              key={order.latest_charge.id}
              className="bg-white dark:bg-gray-800 rounded-md shadow-md mb-4"
            >
              <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                ${(order.amount / 100).toFixed(2)}
              </td>
              <td className="border px-4 py-2 dark:border-gray-700 dark:text-white">
                {order.latest_charge.refunded === true ? "Refunded" : "Paid"}
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
                {order.latest_charge.refunded === false && (
                  <button
                    onClick={() => refundHandler(order.latest_charge.id)}
                    type="button"
                    className="p-1 px-[25px] border border-solid border-red-600 dark:border-red-400 text-[18px] text-black dark:text-white font-medium align-middle duration-300 uppercase flex items-center justify-center gap-2 bg-red-600 dark:bg-red-400 hover:bg-red-500 dark:hover:bg-red-300 w-[150px]"
                  >
                    Refund
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
