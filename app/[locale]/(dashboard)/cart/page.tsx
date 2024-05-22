import React from "react";
import { getProducts, getUserCart } from "../../../api";
import QuintityChangeButtons from "../../../../components/QuintityChangeButtons";
import ClearButton from "@/components/ClearButton";

export default async function page() {
  const cart = await getUserCart(32);
  const cartProductsArray = Object.entries(cart?.products);
  const cartProducts = await getProducts();

  const cartProductMap = new Map(cartProductsArray);

  const filteredProducts = cartProducts
    .filter((product: any) => cartProductMap.has(product.id.toString()))
    .map((product: any) => ({
      ...product,
      quantity: cartProductMap.get(product.id.toString()),
    }));

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
    </div>
  );
}
