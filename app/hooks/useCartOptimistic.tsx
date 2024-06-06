import { CartOptimisticContext } from "@/providers/CartOptimisticProvider";
import { useContext } from "react";

export function useCartOptimistic() {
  const context = useContext(CartOptimisticContext);

  return context;
}
