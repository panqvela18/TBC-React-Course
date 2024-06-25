import { getReviewsForUser } from "@/app/api";
import { Review } from "@/app/interface";
import DeleteReview from "@/components/DeleteReview";
import EditReview from "@/components/EditReview";
import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { getI18n } from "@/locales/server";

export const metadata = {
  title: "Reviews",
  description: "Reviews by Next",
};

export default async function Reviews() {
  const reviews = await getReviewsForUser();
  noStore();
  const t = await getI18n();

  console.log(reviews);
  return (
    <main>
      <div className="container mx-auto px-[4%] py-4">
        <h2 className="text-2xl font-semibold mb-4">{t("myReviews")}</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">{t("productName")}</th>
                <th className="px-4 py-2">{t("star")}</th>
                <th className="px-4 py-2">{t("message")}</th>
                <th className="px-4 py-2">{t("actions")}</th>
              </tr>
            </thead>
            <tbody>
              {reviews.reviews?.map((review: Review) => (
                <tr
                  key={review.review_id}
                  className="bg-white dark:bg-gray-800 rounded-md shadow-md mb-4"
                >
                  <td className="border px-4 py-2">{review.product_name}</td>
                  <td className="border px-4 py-2">{review.star}</td>
                  <td className="border px-4 py-2">{review.message}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    <div className="flex items-center">
                      <EditReview
                        user_id={review.user_id}
                        id={review.id}
                        product_id={review.product_id}
                        userName={review.user_name}
                        reviewMessage={review.message}
                        star={review.star}
                      />
                      <DeleteReview id={review.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
