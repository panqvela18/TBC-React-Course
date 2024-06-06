"use client";
import { createAddReviewAction } from "@/app/actions";
import { reviewData } from "@/app/interface";
import { Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({
  userName,
  user_id,
  product_id,
}: {
  userName: string;
  user_id: number;
  product_id: number;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleClose = () => setOpen(false);

  const handleSendReview = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const revieData: reviewData = {
      user_id,
      product_id,
      rating,
      message,
    };
    try {
      await createAddReviewAction(revieData);
      console.log("ssssss");
    } catch (error) {
      // Handle error appropriately, e.g., display an error message
      console.error("Error creating user:", error);
    }
    handleClose();
    router.refresh();
  };

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className="stars"
        size={20}
        color={i <= rating ? "#F6BE59" : "#ccc"}
      />
    );
  }
  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md">
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
                color={ratingValue <= (hover || rating) ? "#F6BE59" : "#e4e5e9"}
              />
            </label>
          );
        })}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <>
          <div className="w-1/2 max-w-md p-4">
            <form
              onSubmit={handleSendReview}
              className="bg-white p-6 rounded-lg shadow-md"
            >
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
        </>
      </Modal>
    </div>
  );
}
