import Api from "@/Data/Api";
import HomeClient from "@/components/HomeClient";

const fetchProducts = async () => {
  try {
    const response = await Api.get("products");
    return response.data.products;
  } catch (error) {
    console.log(error);
  }
};

export default async function Home() {
  const data = await fetchProducts();
  return <HomeClient prdata={data} />;
}
