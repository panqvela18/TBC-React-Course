"use client";
import Api from "@/Data/Api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import defaulImage from "../../../../public/Teamwork.png";
import { AiFillLike } from "react-icons/ai";
import Loader from "@/components/Loader";

export default function BlogDetail({ params }) {
  const [postDetail, setPostDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = params;
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        const response = await Api.get(`posts/${id}`);
        setPostDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching postsDetail:", error);
      }
    };

    fetchPostDetail();
  }, [id]);
  return (
    <main className="px-[4%]">
      {loading ? (
        <Loader />
      ) : (
        <section className="flex flex-col justify-center items-center">
          <div className="flex items-center my-6">
            <h1 className="text-center text-gray-500 font-bold text-2xl underline mr-5">
              {postDetail?.title}
            </h1>
            <div className="flex items-center">
              <AiFillLike color="gray" fontSize={25} />
              <span>{postDetail?.reactions}</span>
            </div>
          </div>
          <Image
            className="w-screen object-cover h-96 rounded"
            src={defaulImage}
            alt="postImage"
            width={500}
            height={500}
          />
          <div className="flex flex-wrap items-center mt-5">
            {postDetail?.tags.map((tag, index) => {
              return (
                <button
                  key={index}
                  className="p-2 rounded-lg bg-slate-300 text-white mr-2"
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <div className="column-container my-6">
            <p className="column-2 gap-x-8 text-lg text-gray-400">
              {postDetail?.body}
            </p>
          </div>
        </section>
      )}
    </main>
  );
}
