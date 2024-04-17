"use client";
import Api from "@/Data/Api";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import ProductDetailInfo from "@/components/ProductDetailInfo";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Product from "@/components/Product";
import Loader from "@/components/Loader";

export default function ProductDetail({ params }) {
  const { id } = params;
  const [productDetail, setProductDetail] = useState(null);
  const [products, setProducts] = useState(null);
  const [loader, setLoader] = useState(true);

  console.log(products);

  console.log(productDetail);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await Api.get(`products/${id}`);
        setProductDetail(response.data);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoader(false);
      }
    };

    fetchProductDetail();
  }, [id]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Api.get("products");
        setProducts(response.data.products);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoader(false);
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <main className="px-[4%] bg-[aliceblue]">
      {loader ? (
        <Loader />
      ) : (
        <>
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
              <ProductDetailInfo
                info={"Brand:"}
                detail={productDetail?.brand}
              />
              <ProductDetailInfo
                info={"Category:"}
                detail={productDetail?.category}
              />
              <ProductDetailInfo
                info={"discountPercentage:"}
                detail={`${
                  productDetail ? productDetail.discountPercentage : ""
                }%`}
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
          <section>
            <h3 className="text-center pt-6 text-gray-600 font-bold text-2xl underline mb-6">
              Similar Products
            </h3>
            <Swiper
              cssMode={true}
              navigation={true}
              pagination={true}
              mousewheel={true}
              keyboard={true}
              modules={[Mousewheel, Keyboard, Autoplay]}
              slidesPerView={4}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
            >
              {products
                ?.filter((prod) => prod.category === productDetail?.category)
                .filter((prod) => prod.id !== productDetail?.id)
                .map((prod) => {
                  return (
                    <SwiperSlide className="grid grid-cols-4 gap-2">
                      <div className="h-[500px] mr-4">
                        <Product
                          id={prod.id}
                          key={prod.id}
                          img={prod.thumbnail}
                          name={prod.title}
                          description={prod.description}
                          price={prod.price}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </section>
        </>
      )}
    </main>
  );
}
