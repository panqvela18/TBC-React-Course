import Image from "next/image";
import StarRating from "@/components/StarRating";
import ShareOnSocials from "@/components/ShareOnSocials";
import {
  getProductDetail,
  getProducts,
  getUserId,
  getUserInfo,
} from "@/app/api";
import { ProductFromVercel } from "@/app/interface";
import EditReview from "@/components/EditReview";
import DeleteReview from "@/components/DeleteReview";

interface ProductsDetailsProps {
  params: {
    id: number;
    locale: string;
  };
}

export async function generateMetadata({ params }: ProductsDetailsProps) {
  const productsData = await getProducts();
  const product = productsData.find(
    (product: ProductFromVercel) => product.id == params.id
  );

  return {
    title: `${product.title}`,
    description: `${product.description}`,
  };
}

export default async function ProductDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const { product, reviews }: { product: any; reviews: any } =
    await getProductDetail(id);

  const user = await getUserInfo();
  const userName = user?.name;
  const user_id = await getUserId();
  console.log(user, "rev");

  const userReviewIds = reviews.map((review: any) => review.user_id);
  const userAlreadyWriteReview = userReviewIds.includes(user_id);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex justify-center items-center">
        <StarRating
          user_id={user_id}
          product_id={product.id}
          userName={userName}
          reviews={reviews}
          userAlreadyWriteReview={userAlreadyWriteReview}
        />
        <Image
          src={product.image_gallery[0].image_url}
          width={100}
          height={100}
          alt="image"
        />
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
      {reviews?.map((rev: any, index: any) => (
        <div key={index}>
          <p>{rev.message}</p>
          {user_id === rev.user_id && (
            <div>
              <EditReview
                user_id={rev.user_id}
                id={rev.id}
                product_id={rev.product_id}
                userName={userName}
                reviewMessage={rev.message}
                star={rev.star}
              />
              <DeleteReview id={rev.id} />
            </div>
          )}
        </div>
      ))}
      {product?.image_gallery?.map((item: any) => (
        <Image
          key={item.id}
          src={item.image_url}
          width={100}
          height={100}
          alt="image"
        />
      ))}
    </div>
  );
}
