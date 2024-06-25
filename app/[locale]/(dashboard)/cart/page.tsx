import React from "react";
import { getProducts, getUserCart } from "../../../api";
import QuintityChangeButtons from "../../../../components/QuintityChangeButtons";
import ClearButton from "@/components/ClearButton";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { unstable_noStore as noStore } from "next/cache";
import { ProductFromVercel } from "@/app/interface";
import { getI18n } from "@/locales/server";

export const metadata = {
  title: "Cart",
  description: "Cart by Next",
};

export default async function Page() {
  const cart = await getUserCart();
  const cartProductsArray = cart ? Object.entries(cart?.products) : [];
  const cartProducts = await getProducts();
  noStore();

  const t = await getI18n();

  const cartProductMap = new Map(cartProductsArray);

  const filteredProducts = cartProducts
    .filter((product: ProductFromVercel) =>
      cartProductMap.has(product.id.toString())
    )
    .map((product: ProductFromVercel) => ({
      ...product,
      quantity: cartProductMap.get(product.id.toString()),
    }));

  const totalPrice = filteredProducts.reduce((acc: number, item: any) => {
    return acc + parseFloat(item.price) * item.quantity;
  }, 0);

  return (
    <div className="container flex justify-center items-center mx-auto p-6 space-x-8">
      <div className="w-2/3 md:w-full">
        <h1 className="text-2xl font-bold mb-4">{t("cart")}</h1>
        {filteredProducts.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 gap-4">
              {filteredProducts.map((prod: ProductFromVercel) => (
                <div
                  key={prod.id}
                  className="p-4 border rounded-lg shadow-sm flex items-center justify-between md:flex-col"
                >
                  <div>
                    <p className="text-lg font-semibold">{prod.title}</p>
                    <span className="text-gray-500">
                      {t("quantity")}: {prod.quantity}
                    </span>
                  </div>
                  <QuintityChangeButtons id={prod.id} />
                </div>
              ))}
            </div>
            <div>
              <ClearButton />
              <button className="mt-4 h-10 py-2 px-4 rounded font-bold w-[150px] text-white bg-[#11545c] hover:bg-[#0d3f47] hover:underline md:w-auto ">
                <Link href={"/checkout"}>{t("Checkout")}</Link>
              </button>
            </div>
            <h5 className="mt-4 text-xl font-semibold">
              {t("totalPrice")}: ${totalPrice.toFixed(2)}
            </h5>
          </div>
        ) : (
          <p className="text-lg font-semibold">{t("cartIsEmpty")}</p>
        )}
      </div>

      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        autoClose={5000}
        theme="colored"
        newestOnTop={false}
        draggable
        pauseOnHover
        closeOnClick
      />
    </div>
  );
}
