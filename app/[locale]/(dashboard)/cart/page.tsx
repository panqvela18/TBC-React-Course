import React from "react";
import { getProducts, getUserCart } from "../../../api";
import QuintityChangeButtons from "../../../../components/QuintityChangeButtons";
import ClearButton from "@/components/ClearButton";
// import { useCartOptimistic } from "@/app/hooks/useCartOptimistic";
// import { useCart } from "@/app/providers/CartContext";

export const metadata = {
  title: "Cart",
  description: "Cart by Next",
};

export default async function page() {
  // const { optimistic } = useCartOptimistic();

  const cart = await getUserCart();
  const cartProductsArray = cart ? Object.entries(cart?.products) : [];
  const cartProducts = await getProducts();

  const cartProductMap = new Map(cartProductsArray);

  const filteredProducts = cartProducts
    .filter((product: any) => cartProductMap.has(product.id.toString()))
    .map((product: any) => ({
      ...product,
      quantity: cartProductMap.get(product.id.toString()),
    }));
  const totalPrice = filteredProducts.reduce((acc: number, item: any) => {
    return acc + parseFloat(item.price) * item.quantity;
  }, 0);
  console.log(totalPrice);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { filteredProducts } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.map((prod: any) => (
          <div
            key={prod.id}
            className="p-4 border rounded-lg shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-lg font-semibold">{prod.title}</p>
              <span className="text-gray-500">Quantity: {prod.quantity}</span>
            </div>
            <QuintityChangeButtons id={prod.id} />
          </div>
        ))}
      </div>
      <ClearButton />
      <h5>{totalPrice.toFixed(2)}</h5>
    </div>
  );
}
