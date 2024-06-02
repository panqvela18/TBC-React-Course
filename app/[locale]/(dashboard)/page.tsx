import { getProducts, getUserId, getUserRole } from "@/app/api";
import HomeClient from "@/components/HomeClient";
export const metadata = {
  title: "Home",
  description: "Blog by Next",
};

export default async function Home() {
  const products = await getProducts();
  const userId = await getUserId();
  const userRole = await getUserRole();

  return <HomeClient userRole={userRole} userId={userId} products={products} />;
}
