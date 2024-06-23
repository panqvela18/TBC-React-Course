import { getProducts, getUserCart, getUserInfo } from "@/app/api";
import CheckoutButton from "@/components/CheckoutButton";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";

export default async function Checkout() {
  const cart = await getUserCart();
  const cartProductsArray = cart ? Object.entries(cart?.products) : [];
  const cartProducts = await getProducts();
  const user = await getUserInfo();
  noStore();

  const cartProductMap = new Map(cartProductsArray);

  const filteredProducts = cartProducts
    .filter((product: any) => cartProductMap.has(product.id.toString()))
    .map((product: any) => ({
      ...product,
      quantity: cartProductMap.get(product.id.toString()),
    }));

  return (
    <>
      <CheckoutButton authUser={user} selectedProducts={filteredProducts} />
    </>
  );
}
