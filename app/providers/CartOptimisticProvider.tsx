"use client";
import { createContext, useOptimistic } from "react";
import { ProductFromVercel } from "../interface";

export interface IStorageCart {
  count: number;
  price: number | string;
  products: ProductFromVercel[];
}

type CartOptimisticContextType = {
  optimistic: IStorageCart;
  addOptimistic: (action: IStorageCart) => void;
};

export const CartOptimisticContext = createContext<CartOptimisticContextType>({
  optimistic: { count: 0, price: 0, products: [] },
  addOptimistic: () => {},
});

export function CartOptimisticContextProvider({
  children,
  cart,
}: {
  children: React.ReactNode;
  cart: IStorageCart;
}) {
  const [optimistic, addOptimistic] = useOptimistic<IStorageCart, IStorageCart>(
    cart,
    (state, newCart) => {
      return { ...state, ...newCart };
    }
  );

  return (
    <CartOptimisticContext.Provider value={{ optimistic, addOptimistic }}>
      {children}
    </CartOptimisticContext.Provider>
  );
}
