"use client";
import Api from "@/Data/Api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import ProductDetailInfo from "@/components/ProductDetailInfo";

export default function ProductDetail({ params }) {
  const { id } = params;
  const [productDetail, setProductDetail] = useState(null);

  console.log(productDetail);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await Api.get(`products/${id}`);
        setProductDetail(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  return (
    <main className="px-[4%] ">
      <div className="flex items-center justify-center pt-6">
        <h1 className="text-center mr-2 text-gray-500 font-bold text-2xl underline">
          {productDetail?.title}
        </h1>
        <div className="flex items-center">
          <FaStar color="yellow" />
          <span className="ml-1">{productDetail?.rating} out of 5</span>
        </div>
      </div>
      <section className="flex items-center justify-center py-16">
        {productDetail && (
          <Image
            width={500}
            height={500}
            src={productDetail.thumbnail}
            alt={productDetail.title}
            className="mr-20 rounded h-[400px] object-cover object-center"
            priority
          />
        )}

        <div className="w-80 flex flex-col">
          <ProductDetailInfo info={"Brand:"} detail={productDetail?.brand} />
          <ProductDetailInfo
            info={"Category:"}
            detail={productDetail?.category}
          />
          <ProductDetailInfo
            info={"discountPercentage:"}
            detail={`${productDetail ? productDetail.discountPercentage : ""}%`}
          />
          <ProductDetailInfo
            info={"Price:"}
            detail={`${productDetail ? productDetail.price : ""}$`}
          />
          <p className="text-gray-700 text-base mb-6">
            {productDetail?.description}
          </p>
          <button className="p-4 bg-slate-300 font-bold text-xl">
            BUY NOW
          </button>
        </div>
      </section>
      <section>
        <h2 className="text-center pt-6 text-gray-600 font-bold text-2xl underline">
          GALLERY
        </h2>
        <div className="flex flex-wrap items-center justify-center py-16">
          {productDetail &&
            productDetail.images.map((img, index) => (
              <Image
                key={index}
                loading="lazy"
                src={img}
                width={200}
                height={200}
                alt="gallery-image"
                className="rounded object-cover w-40 h-40"
              />
            ))}
        </div>
      </section>
    </main>
  );
}
