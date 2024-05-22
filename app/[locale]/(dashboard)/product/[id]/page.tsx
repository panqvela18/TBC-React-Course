// import Image from "next/image";
// import { FaStar } from "react-icons/fa6";
// import ProductDetailInfo from "@/components/ProductDetailInfo";
// import ProductsSwiper from "@/components/ProductsSwiper";
import { ProductFromVercel } from "@/app/interface";
// import { setStaticParamsLocale } from "next-international/server";
import { getProductDetail } from "@/app/api";

// export async function generateStaticParams() {
//   try {
//     const response = await fetch(`http://localhost:3000/api/get-products`);
//     if (!response.ok) {
//       throw new Error(`Failed to fetch: ${response.statusText}`);
//     }
//     const { products } = await response.json();

//     return products?.rows?.map((product: { id: number }) => ({
//       id: `${product.id}`,
//     }));
//   } catch (error) {
//     console.error("Error fetching or processing products:", error);
//     return [];
//   }
// }

export default async function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const prodDetail: ProductFromVercel = await getProductDetail(id);

  return (
    <div className="flex justify-center items-center">
      <h1>{prodDetail.title}</h1>
    </div>
  );
}
