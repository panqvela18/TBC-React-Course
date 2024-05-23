"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { getProducts, getUserCart } from "../api";
import { Cart, ProductFromVercel, ProductWithQuantity } from "../interface";

interface CartContextType {
  totalQuantity: number;
  filteredProducts: ProductWithQuantity[];
  fetchCartData: () => Promise<void>;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [filteredProducts, setFilteredProducts] = useState<
    ProductWithQuantity[]
  >([]);

  const fetchCartData = useCallback(async () => {
    try {
      const cart: Cart = await getUserCart(32);
      const cartProductsArray = Object.entries(cart.products);
      const cartProducts: ProductFromVercel[] = await getProducts();

      const num = Object.values(cart.products);
      const totalQuantity = num.reduce(
        (total: number, quantity: number) => total + quantity,
        0
      );
      setTotalQuantity(totalQuantity);

      const cartProductMap = new Map(cartProductsArray);
      const filteredProducts: ProductWithQuantity[] = cartProducts
        .filter((product) => cartProductMap.has(product.id.toString()))
        .map((product) => ({
          ...product,
          quantity: cartProductMap.get(product.id.toString())!,
        }));

      setFilteredProducts(filteredProducts);
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
    }
  }, []);

  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  return (
    <CartContext.Provider
      value={{ totalQuantity, filteredProducts, fetchCartData }}
    >
      {children}
    </CartContext.Provider>
  );
};
