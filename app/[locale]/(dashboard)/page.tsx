// import { getProducts } from "@/app/api";
import { getPosts, getProducts } from "@/app/api";
import HomeClient from "@/components/HomeClient";
export const metadata = {
  title: "TV PROJECT",
  description: "Blog by Next",
};

export default async function Home() {
  const products = await getProducts();
  const blogs = await getPosts();
  // const userId = await getUserId();
  // const userRole = await getUserRole();

  return <HomeClient products={products} blogs={blogs} />;
}
