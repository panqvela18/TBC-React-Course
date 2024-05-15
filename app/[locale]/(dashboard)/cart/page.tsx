"use client";
import { useLocalStorage } from "@/app/hook";
import { ProductData } from "@/app/interface";
import { reducer } from "@/app/useReducerHook";
import Image from "next/image";
import { useEffect, useReducer, useState } from "react";

export default function Cart() {
  const [isClient, setIsClient] = useState(false);
  const [cardsData, setCachedValue] = useLocalStorage("selectedProducts", []);
  const [SelectedProducts, dispatch] = useReducer(reducer, cardsData);

  useEffect(() => {
    setCachedValue(SelectedProducts);
  }, [SelectedProducts, setCachedValue]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (
    action: "INCREMENT" | "DECREMENT" | "REMOVE",
    card: ProductData
  ) => {
    dispatch({ type: action, payload: card });
  };

  const handleProductRemove = (action: "RESET") => {
    dispatch({ type: action });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button
        className="bg-red-500 text-white py-2 px-4 rounded"
        onClick={() => handleProductRemove("RESET")}
      >
        Clear Cart
      </button>
      <div className="mt-8 space-y-4">
        {isClient &&
          cardsData.map((item: any) => (
            <div className="flex items-center space-x-4" key={item.id}>
              <div className="w-24 h-24 relative">
                <Image
                  src={item.selectedCard.thumbnail}
                  layout="fill"
                  objectFit="cover"
                  alt={item.selectedCard.title}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {item.selectedCard.title}
                </h2>
                <p className="text-gray-600">{item.selectedCard.brand}</p>
                <p className="text-gray-700">{item.selectedCard.description}</p>
                <p className="text-gray-800">${item.selectedCard.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex justify-center items-center"
                  onClick={() =>
                    handleQuantityChange("DECREMENT", item.selectedCard)
                  }
                >
                  -
                </button>
                <span className="text-gray-800">{item.count}</span>
                <button
                  className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex justify-center items-center"
                  onClick={() =>
                    handleQuantityChange("INCREMENT", item.selectedCard)
                  }
                >
                  +
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() =>
                    handleQuantityChange("REMOVE", item.selectedCard)
                  }
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
