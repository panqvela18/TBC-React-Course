import { getProducts, getUserId, getUserRole } from "@/app/api";
import ProductClient from "@/components/ProductClient";

export default async function Profile() {
  const products = await getProducts();
  const userId = await getUserId();
  const userRole = await getUserRole();

  return (
    <ProductClient userRole={userRole} userId={userId} products={products} />
  );
}
