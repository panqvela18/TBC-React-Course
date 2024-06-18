"use client";

import { checkout } from "@/app/actions";
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

  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCartProducts(selectedProducts);
  }, []);

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
    // setLoading(true);
    e.preventDefault();
    await checkout(cartProducts, profile);
    // setLoading(false);
  };

  const countSubtotal = cartProducts.reduce((curr: number, acc: any) => {
    return curr + acc.quantity * acc.price;
  }, 0);

  const subtotal = Math.round(countSubtotal * 100) / 100;
  console.log(selectedProducts);

  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center min-h-screen">
        <div>
          {selectedProducts.map((product) => {
            return (
              <>
                <h4 className="text-black">{product.title}</h4>
                <span className="text-black">{product.price}</span>
                <span className="text-black">{product.quantity}</span>
              </>
            );
          })}
          <p className="text-black">{subtotal}</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Contact Information
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-medium mb-2"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="tel"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your name number"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your address"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#11545c] text-white p-3 rounded-md font-medium hover:bg-[#11555cc9] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
