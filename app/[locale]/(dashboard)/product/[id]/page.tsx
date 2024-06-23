// import Image from "next/image";
import StarRating from "@/components/StarRating";
import ShareOnSocials from "@/components/ShareOnSocials";
import ImageGallery from "@/components/ImageGallery";
import {
  getProductDetail,
  getProducts,
  getUserId,
  getUserInfo,
} from "@/app/api";
import { ProductFromVercel } from "@/app/interface";
import { unstable_noStore as noStore } from "next/cache";

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
  const userReviewIds = reviews.map((review: any) => review.user_id);
  const userAlreadyWriteReview = userReviewIds.includes(user_id);
  // const t = await getI18n();
  noStore();

  return (
    <div className="max-w-full mx-auto px-[15%] mt-5">
      <div
        style={{ backgroundColor: "rgba(217, 217, 217, 0.1)" }}
        className="category-banner w-[200px] h-[118px] flex flex-col items-center justify-center rounded-3xl mb-5"
      >
        <span className="text-white mb-5">Category</span>
        <span className="text-white">{product.category}</span>
      </div>
      <div className="flex md:flex-nowrap gap-6">
        <div className="w-1/2 mr-5 md:w-full">
          <ImageGallery gallery={product?.image_gallery} />
        </div>
        <div className="flex-grow w-1/2 md:w-full">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {product.title}
          </h1>
          <StarRating
            user_id={user_id}
            product_id={product.id}
            userName={userName}
            reviews={reviews}
            userAlreadyWriteReview={userAlreadyWriteReview}
          />
          <h3
            className="mb-3 text-xl"
            style={{ color: "rgba(255, 255, 255, 0.4)" }}
          >
            Stock
            <span className="text-[#86EFAC] ml-2">
              {product.stock} Available
            </span>
          </h3>
          <div className="flex items-center mb-3">
            <span className="text-[#60A5FA] mr-5 text-[40px] font-bold">
              ${product.price}
            </span>
            {product.discount == "0.00" ? (
              ""
            ) : (
              <span className="line-through text-gray-500 text-[40px]">
                ${Number(product.price) + Number(product.discount)}
              </span>
            )}
          </div>
          <p className="text-[#FFFFFF66] opacity-40 text-2xl mb-3">
            {product.description}
          </p>
          <div className="h-[1px] w-full bg-[#FFFFFF1A] opacity-10 mb-3"></div>
          <ShareOnSocials product={product} />
        </div>
      </div>
    </div>
  );
}
