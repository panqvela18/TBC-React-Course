import { getOrders } from "@/app/api";
import OrdersList from "@/components/OrdersList";

export default async function Orders() {
  const orders = await getOrders();
  console.log(orders, "orders");
  return (
    <>
      <h1>Orders</h1>
      <OrdersList orders={orders} />
    </>
  );
}
