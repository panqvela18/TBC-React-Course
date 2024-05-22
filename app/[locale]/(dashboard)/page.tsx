import { getProducts } from "@/app/api";
import HomeClient from "@/components/HomeClient";

export default async function Home() {
  const products = await getProducts();

  return <HomeClient products={products} />;
}
