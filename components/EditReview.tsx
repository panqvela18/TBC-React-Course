"use client";
import { createEditReviewAction } from "@/app/actions";
import { EditreviewData } from "@/app/interface";
import { Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useI18n } from "@/locales/client";

export default function EditReview({
  user_id,
  product_id,
  id,
  userName,
  star,
  reviewMessage,
}: {
  user_id: number;
  product_id: number;
  id: number;
  userName: string;
  reviewMessage: string;
  star: number;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<number | null>(null);
  const router = useRouter();
  const t = useI18n();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validationSchema = Yup.object({
    rating: Yup.number().min(1, t("Ratingrequired")),
    message: Yup.string().required(t("Reviewmessage")),
  });

  return (
    <>
      <CiEdit
        className="cursor-pointer mr-3"
        onClick={handleOpen}
        fontSize={30}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl max-h-full overflow-y-auto">
          <Formik
            initialValues={{
              rating: star,
              message: reviewMessage,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              const reviewData: EditreviewData = {
                id,
                user_id,
                product_id,
                rating: values.rating,
                message: values.message,
              };
              try {
                await createEditReviewAction(reviewData);
                resetForm();
              } catch (error) {
                console.error("Error editing review:", error);
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
                    {t("userName")}
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
      </Modal>
    </>
  );
}
