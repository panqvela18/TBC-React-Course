"use client";
import { checkout } from "@/app/actions";
import { useI18n } from "@/locales/client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function CheckoutButton({
  selectedProducts,
  authUser,
}: {
  selectedProducts: any[];
  authUser: any;
}) {
  const [cartProducts, setCartProducts] = useState<any[] | []>([]);
  const [profile, setProfile] = useState<any>({
    name: "",
    address: "",
    phone: "",
    sub: "",
  });

  useEffect(() => {
    setCartProducts(selectedProducts);
  }, [selectedProducts]);

  const t = useI18n();

  useEffect(() => {
    if (authUser) {
      setProfile({
        name: authUser.name || "",
        address: authUser.address || "",
        phone: authUser.phone || "",
        sub: authUser.sub || "",
      });
    }
  }, [authUser]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await checkout(cartProducts, profile);
  };

  const countSubtotal = cartProducts.reduce((curr: number, acc: any) => {
    return curr + acc.quantity * acc.price;
  }, 0);

  const subtotal = Math.round(countSubtotal * 100) / 100;

  return (
    <div className="bg-[#adb5bd] dark:bg-slate-900 min-h-screen flex items-center justify-center sm:flex-col sm:p-8 ">
      <div className="text-black dark:text-white mr-10 sm:mr-0 sm:mb-2">
        {selectedProducts.map((product, index) => (
          <div key={index} className="flex items-center mb-4">
            <div className="w-16 h-16 relative overflow-hidden rounded-md mr-4">
              <Image
                layout="fill"
                objectFit="cover"
                alt="product"
                src={product?.image_gallery[0].image_url}
              />
            </div>
            <div>
              <h4 className="text-lg font-semibold">{product.title}</h4>
              <p className="text-sm">{product.price}</p>
              <p className="text-sm">
                {t("quantity")}: {product.quantity}
              </p>
            </div>
          </div>
        ))}
        <p className="text-lg font-semibold">
          {t("totalPrice")}: ${subtotal}
        </p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          {t("ContactInformation")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 dark:text-white font-medium mb-2"
            >
              {t("phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t("phone")}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 dark:text-white font-medium mb-2"
            >
              {t("name")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t("name")}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 dark:text-white font-medium mb-2"
            >
              {t("Address")}
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={t("Address")}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#11545c] dark:bg-[#0f3d47] text-white dark:text-gray-200 p-3 rounded-md font-medium hover:bg-[#11555cc9] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {t("buy")}
          </button>
        </form>
      </div>
    </div>
  );
}
