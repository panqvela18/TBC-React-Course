"use client";
import { createEditReviewAction } from "@/app/actions";
import { EditreviewData } from "@/app/interface";
import { Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

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
  const [rating, setRating] = useState<number>(star || 0);
  const [hover, setHover] = useState<number | null>(null);
  const [message, setMessage] = useState<string>(reviewMessage || "");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  console.log(rating, message, id, user_id, product_id);

  const handleSendReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reviewData: EditreviewData = {
      id,
      user_id,
      product_id,
      rating,
      message,
    };
    try {
      await createEditReviewAction(reviewData);
      console.log("ssssss");
    } catch (error) {
      console.error("Error creating user:", error);
    }
    handleClose();
    router.refresh();
  };
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
          <form
            onSubmit={handleSendReview}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex mb-4">
              {[...Array(5)].map((_star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index} className="cursor-pointer">
                    <input
                      className="hidden"
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => {
                        setRating(ratingValue);
                        setOpen(true);
                      }}
                    />
                    <FaStar
                      className="stars"
                      size={30}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                      color={
                        ratingValue <= (hover || rating) ? "#F6BE59" : "#e4e5e9"
                      }
                    />
                  </label>
                );
              })}
            </div>
            <p className="text-gray-600 mb-4">({rating} out of 5)</p>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="userName"
              >
                User Name
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
                Review
              </label>
              <textarea
                id="review"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
