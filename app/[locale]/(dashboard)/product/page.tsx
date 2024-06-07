import { getProducts, getUserId } from "@/app/api";
import ProductClient from "@/components/ProductClient";

export default async function Profile() {
  const products = await getProducts();
  const userId = await getUserId();
  // const userRole = await getUserRole();

  return <ProductClient userId={userId} products={products} />;
}
