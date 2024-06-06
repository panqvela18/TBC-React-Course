// import Image from "next/image";
// import { FaStar } from "react-icons/fa6";
// import ProductDetailInfo from "@/components/ProductDetailInfo";
// import ProductsSwiper from "@/components/ProductsSwiper";
// import { ProductFromVercel } from "@/app/interface";
// import { setStaticParamsLocale } from "next-international/server";
import { getProductDetail, getUserId } from "@/app/api";
import Image from "next/image";
import StarRating from "@/components/StarRating";
import { getSession } from "@auth0/nextjs-auth0";
import ShareOnSocials from "@/components/ShareOnSocials";

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
// export async function generateMetadata({
//   params: { id },
// }: {
//   params: { id: string };
// }) {
//   const { product }: any = await getProductDetail(id);

//   return {
//     title: product.title,
//     description: product.description,
//   };
// }

export default async function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const {
    product,
    reviews,
    gallery,
  }: { product: any; reviews: any; gallery: any } = await getProductDetail(id);
  const user = await getSession();
  const userName = user?.user.name;
  const user_id = await getUserId();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-center items-center">
        <StarRating
          user_id={user_id}
          product_id={product.id}
          userName={userName}
        />
        <Image src={product.image_url} width={100} height={100} alt="image" />
      </div>
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {product.title}
        </h1>
        <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
          ${product.price}
        </h2>
      </div>
      <div className="mb-4">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {product.description}
        </p>
      </div>
      <div className="flex flex-wrap justify-center items-center space-x-4 mt-4">
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow">
          <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
            Category
          </h4>
          <span className="text-gray-600 dark:text-gray-300">
            {product.category}
          </span>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow">
          <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
            Discount
          </h4>
          <span className="text-green-500 dark:text-green-300">
            {product.discount}%
          </span>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow">
          <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-1">
            Stock
          </h4>
          <span
            className={`text-lg font-bold ${
              typeof product.stock === "number" && product.stock > 0
                ? "text-green-500 dark:text-green-300"
                : "text-red-500 dark:text-red-300"
            }`}
          >
            {typeof product.stock === "number" && product.stock > 0
              ? `${product.stock} available`
              : "Out of stock"}
          </span>
        </div>
        <ShareOnSocials product={product} />
      </div>
      {reviews?.map((rev: any, index: any) => {
        return <p key={index}>{rev.message}</p>;
      })}
      {gallery?.map((item: any) => {
        return (
          <Image
            key={item.id}
            src={item.image_url}
            width={100}
            height={100}
            alt="image"
          />
        );
      })}
    </div>
  );
}
