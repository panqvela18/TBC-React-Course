"use client";
import { createAddReviewAction } from "@/app/actions";
import { Reviews, reviewData } from "@/app/interface";
import { Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useI18n } from "@/locales/client";

export default function StarRating({
  userName,
  user_id,
  userAlreadyWriteReview,
  product_id,
  reviews,
}: {
  userName: string;
  user_id: number;
  product_id: number;
  reviews: Reviews[];
  userAlreadyWriteReview: boolean;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<number | null>(null);
  const router = useRouter();

  const handleClose = () => setOpen(false);
  const t = useI18n();

  const reviewsData: Reviews[] = reviews;

  const totalStars = reviewsData.reduce((sum, review) => sum + review.star, 0);
  const averageStars =
    reviewsData.length > 0 ? totalStars / reviewsData.length : 0;

  const generateStars = (averageStars = 0) => {
    averageStars = Math.max(0, Math.min(averageStars, 5));

    const fullStars = Math.floor(averageStars);
    const halfStar = averageStars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }).map((_, index) => (
          <FaStar
            key={`full-${index}`}
            className="stars"
            size={30}
            color={"#F6BE59"}
          />
        ))}
        {halfStar && (
          <FaStarHalfAlt className="stars" size={30} color={"#F6BE59"} />
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FaRegStar
            key={`empty-${index}`}
            className="stars"
            size={30}
            color={"#F6BE59"}
          />
        ))}
      </>
    );
  };

  const validationSchema = Yup.object({
    rating: Yup.number().min(1, t("Ratingrequired")),
    message: Yup.string().required(t("Reviewmessage")),
  });

  return (
    <div className="flex flex-col rounded-lg mb-5">
      <label className="cursor-pointer flex items-center ">
        <input className="hidden" type="radio" name="rating" />
        {generateStars(averageStars)}
        <p className="mx-3" style={{ color: "rgba(255, 255, 255, 0.4)" }}>
          {averageStars.toFixed(2)}
        </p>
        <span style={{ color: "rgba(255, 255, 255, 0.4)" }}>
          (Rated by {reviews.length})
        </span>
        {userAlreadyWriteReview || userName === undefined ? (
          ""
        ) : (
          <button className="text-black" onClick={() => setOpen(true)}>
            {t("addReview")}
          </button>
        )}
      </label>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <>
          <div className="w-1/2 max-w-md p-4">
            <Formik
              initialValues={{
                rating: 0,
                message: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const reviewData: reviewData = {
                  user_id,
                  product_id,
                  rating: values.rating,
                  message: values.message,
                };
                try {
                  await createAddReviewAction(reviewData);
                  resetForm();
                } catch (error) {
                  console.error("Error creating user:", error);
                }
                handleClose();
                router.refresh();
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_star, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index} className="cursor-pointer">
                          <Field
                            type="radio"
                            name="rating"
                            className="hidden"
                            value={ratingValue}
                            onClick={() => setFieldValue("rating", ratingValue)}
                          />
                          <FaStar
                            className="stars"
                            size={30}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                            color={
                              ratingValue <= (hover || values.rating)
                                ? "#F6BE59"
                                : "#e4e5e9"
                            }
                          />
                        </label>
                      );
                    })}
                  </div>
                  <p className="text-gray-600 mb-4">
                    ({values.rating} {t("outof5")})
                  </p>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="userName"
                    >
                      {t("username")}
                    </label>
                    <input
                      type="text"
                      value={userName}
                      readOnly
                      disabled
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      htmlFor="review"
                    >
                      {t("Review")}
                    </label>
                    <Field
                      as="textarea"
                      id="review"
                      name="message"
                      placeholder={t("Yourmessage")}
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      disabled={isSubmitting}
                    >
                      {t("send")}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      </Modal>
    </div>
  );
}
