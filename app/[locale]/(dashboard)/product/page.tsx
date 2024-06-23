import { getProducts } from "@/app/api";
import ProductClient from "@/components/ProductClient";
import { unstable_noStore as noStore } from "next/cache";

export const metadata = {
  title: "Products",
  description: "Products by Next",
};
export default async function Profile() {
  const products = await getProducts();
  console.log(products);
  noStore();

  return <ProductClient products={products} />;
}
