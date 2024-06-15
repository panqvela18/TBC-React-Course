"use client";

import { createRefund } from "../app/actions";

const OrdersList = ({ orders }: any) => {
  const refundHandler = async (charge: string) => {
    await createRefund(charge);
  };

  return (
    <div className="container mx-auto px-[4%] py-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Receipt</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr
              key={order.latest_charge.id}
              className="bg-white rounded-md shadow-md mb-4"
            >
              <td className="border px-4 py-2">
                ${(order.amount / 100).toFixed(2)}
              </td>
              <td className="border px-4 py-2">
                {order.latest_charge.refunded === true ? "Refunded" : "Paid"}
              </td>
              <td className="border px-4 py-2">{order.metadata.address}</td>
              <td className="border px-4 py-2">
                <a
                  href={order.latest_charge.receipt_url}
                  aria-label="Order Receipt"
                  target="_blank"
                  className="text-red underline"
                  rel="noopener noreferrer"
                >
                  View Receipt
                </a>
              </td>
              <td className="border px-4 py-2 flex justify-center">
                {order.latest_charge.refunded === false && (
                  <button
                    onClick={() => refundHandler(order.latest_charge.id)}
                    type="button"
                    className="p-1 px-[25px] border border-solid border-red text-[18px] text-black font-medium align-middle duration-300 uppercase flex items-center justify-center gap-2 bg-red hover:bg-lightred w-[150px]"
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
