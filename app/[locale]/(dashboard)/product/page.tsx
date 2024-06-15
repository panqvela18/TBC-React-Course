import { getProducts } from "@/app/api";
import ProductClient from "@/components/ProductClient";

export const metadata = {
  title: "Products",
  description: "Products by Next",
};
export default async function Profile() {
  const products = await getProducts();
  console.log(products);
  // const userRole = await getUserRole();

  return <ProductClient products={products} />;
}
