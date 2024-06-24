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
import { FaStar } from "react-icons/fa";
import Title from "@/components/Title";
import { getI18n } from "@/locales/server";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const products = await getProducts();

  const user = await getUserInfo();
  const userName = user?.name;
  const user_id = await getUserId();
  const userReviewIds = reviews.map((review: any) => review.user_id);
  const userAlreadyWriteReview = userReviewIds.includes(user_id);
  const t = await getI18n();
  noStore();

  console.log(reviews);

  const renderStars = (numberOfStars: number) => {
    const stars = [];
    for (let i = 0; i < numberOfStars; i++) {
      stars.push(<FaStar size={30} color={"#F6BE59"} key={`star-${i}`} />);
    }
    return stars;
  };

  return (
    <section className="bg-gray-100 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-xl py-5 px-20 bg-white dark:bg-slate-900">
          <div className="bg-gray-200 dark:bg-gray-700 w-48 h-28 flex flex-col items-center justify-center rounded-3xl mb-5 text-center">
            <span className="dark:text-white mb-2 text-sm uppercase font-semibold">
              {t("category")}
            </span>
            <span className="dark:text-white text-lg font-bold">
              {product.category}
            </span>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <ImageGallery gallery={product?.image_gallery} />
            </div>

            <div className="w-full md:w-1/2">
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {product.title}
                  </h1>
                  <StarRating
                    user_id={user_id}
                    product_id={product.id}
                    userName={userName}
                    reviews={reviews}
                    userAlreadyWriteReview={userAlreadyWriteReview}
                  />
                  <h3 className="mb-3 text-xl text-gray-700 dark:text-gray-400">
                    {t("stock")}
                    <span className="dark:text-green-400 ml-2">
                      {product.stock} {t("Available")}
                    </span>
                  </h3>
                  <div className="flex items-center mb-4">
                    <span className="text-blue-500 mr-5 text-2xl font-bold">
                      ${product.price}
                    </span>
                    {product.discount !== "0.00" && (
                      <span className="line-through text-gray-500 text-2xl">
                        ${Number(product.price) + Number(product.discount)}
                      </span>
                    )}
                  </div>
                  <p className="dark:text-gray-400 text-lg mb-5 w-2/3">
                    {product.description}
                  </p>
                  <ShareOnSocials product={product} />
                </div>

                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5 text-center">
                    {t("customerReviews")}
                  </h2>

                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review: any, index: number) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
                        >
                          <div className="flex items-center mb-2">
                            <div className="stars mr-2 flex">
                              {renderStars(review.star)}
                            </div>
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {review.name}
                            </h5>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {review.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                      {t("noReviews")}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Title titleName={t("similarProducts")} />
      <div className="grid grid-cols-4 sm:grid-cols-2 px-[4%] md:grid-cols-2 lg:grid-cols-4 gap-8 pb-20 pt-5">
        {products
          .filter(
            (prod: ProductFromVercel) => prod.category === product.category
          )
          .filter((prod: ProductFromVercel) => prod.id !== product.id)
          .slice(0, 4)
          .map((p: ProductFromVercel) => (
            <div
              key={p.id}
              className="bg-white dark:bg-slate-800 p-6 flex flex-col justify-between rounded-lg shadow hover:shadow-lg transition-shadow duration-300 "
            >
              <div className="flex flex-col items-center">
                {p.image_gallery?.[0]?.image_url ? (
                  <Image
                    src={p.image_gallery[0].image_url}
                    width={200}
                    height={200}
                    alt="image"
                    className="rounded mb-4 object-cover"
                  />
                ) : (
                  <Image
                    src="/path/to/default/image.jpg"
                    width={200}
                    height={200}
                    alt="default image"
                    className="rounded mb-4 object-cover"
                  />
                )}
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center">
                  {p.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 text-center">
                  {`${p.description.split(" ").slice(0, 5).join(" ")} ...`}
                </p>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 inline-block">
                  {p.category}
                </span>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-4 inline-block">
                  ${p.price}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Link
                  href={`/product/${p.id}`}
                  className="text-blue-600 dark:text-gray-200 hover:underline transition duration-200 mt-2"
                >
                  {t("learnMore")}
                </Link>
                <AddToCartButton id={p.id.toString()} />
              </div>
            </div>
          ))}
      </div>
      <ToastContainer
        position="bottom-right"
        hideProgressBar={false}
        autoClose={5000}
        theme="colored"
        newestOnTop={false}
        draggable
        pauseOnHover
        closeOnClick
      />
    </section>
  );
}
