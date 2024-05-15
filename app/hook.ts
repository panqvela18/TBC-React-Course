import { useEffect, useState } from "react";

export  function useLocalStorage(key: string, initialValue?: any) {
  const [value, setValue] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const storedValue = window.localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialValue;
      }
    } catch (error) {
      console.error("Error retrieving data from localStorage:", error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}

// import { useState, useEffect } from "react";
// import { ProductCard } from "./app/[locale]/interface";

// function useCart() {
//   const [cartProducts, setCartProducts] = useState<ProductCard[]>(() => {
//     // Load cart data from local storage at initialization
//     if (typeof window !== "undefined") {
//       const savedCart = localStorage.getItem("cartProducts");
//       console.log("Loaded from localStorage:", savedCart);
//       return savedCart ? JSON.parse(savedCart) : [];
//     }
//   });

//   useEffect(() => {
//     // Save cart data to local storage whenever it changes
//     console.log("Saving to localStorage:", cartProducts);
//     if (typeof window !== "undefined") {
//       localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
//     }
//   }, [cartProducts]);

//   const addProductToCart = (product: ProductCard) => {
//     console.log("Adding product:", product);
//     setCartProducts((currentProducts) => [...currentProducts, product]);
//   };

//   return { cartProducts, addProductToCart };
// }

// export default useCart;