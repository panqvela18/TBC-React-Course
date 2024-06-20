"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import Title from "./Title";
import { useI18n } from "@/locales/client";
import { PostData, ProductFromVercel } from "@/app/interface";
import Image from "next/image";

export default function HomeClient({
  products,
  blogs,
}: {
  products: ProductFromVercel[];
  blogs: PostData[];
}) {
  const [showText, setShowText] = useState(false);

  const t = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      if (!showText && window.scrollY >= 1) {
        setShowText(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showText]);

  const buttonProps = {
    Initial: { opacity: 0.5, scale: 0.5 },
    whileInView: { opacity: 1, scale: 1 },
  };
  const textAnimate = {
    Initial: { y: 200, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
  };
  const productAnimate = {
    Initial: { opacity: 0 },
    whileInView: { opacity: 1 },
  };

  const testVideo =
    "https://vt4mrhsohjaaqsi5.public.blob.vercel-storage.com/background-42qk0lNGxfZiKxS76DAj0G0aeb8fyb.mp4";

  return (
    <>
      <main className="relative">
        <section
          className="relative w-full"
          style={{ height: "calc(100vh - 84px)" }}
        >
          <video
            src={testVideo}
            autoPlay
            muted
            loop
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
          {showText && (
            <div className="absolute top-0 left-0 w-full h-full text-white flex items-center justify-center mix-blend-normal">
              <div className="flex flex-col justify-center items-center p-5">
                <motion.h1
                  transition={{
                    ease: "easeInOut",
                    duration: 1,
                    delay: 0.2,
                  }}
                  viewport={{ once: true }}
                  variants={buttonProps}
                  whileInView={buttonProps.whileInView}
                  initial={buttonProps.Initial}
                  className="text-[150px] font-bold select-none"
                >
                  TV PROJECT
                </motion.h1>
                <span
                  className="text-[80px] font-bold text-white select-none font-body"
                  style={{ display: "none" }}
                >
                  PRODUCTION
                </span>
              </div>
            </div>
          )}
        </section>
      </main>
      <motion.section
        whileInView={textAnimate.whileInView}
        initial={textAnimate.Initial}
        viewport={{ once: true }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          delay: 0.4,
        }}
      >
        <div className="items-center flex flex-col text-center py-20">
          <h3 className="text-4xl text-[#11545c] dark:text-[#ececec] font-bold mb-8">
            WELCOME TO TV PROJECT PRODUCTION
          </h3>
          <div className="px-[25%] flex flex-col items-center">
            <p className="text-[18px] text-[#11545c] dark:text-[#ececec]">
              Bringing your stories to life with innovative TV production
              solutions. From concept to final cut, we handle all aspects of
              your project with creativity and expertise. Let&apos;s create
              something amazing together.
            </p>

            <Link
              href={"/about"}
              className="w-32 flex justify-center items-center mt-5 text-[#003049] dark:text-white font-bold hover:text-[#11545c]"
            >
              <span className="pr-2 ">{t("readMore")}</span>
            </Link>
          </div>
        </div>
      </motion.section>
      <motion.section
        whileInView={productAnimate.whileInView}
        initial={productAnimate.Initial}
        viewport={{ once: true }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          delay: 0.7,
        }}
        className="px-[4%] mb-5"
      >
        <Title titleName={t("popularproductTitle")} />
        <div className="flex justify-end mb-3">
          <Link
            href="/product"
            className="bg-[#11545c] text-white py-2 px-6 rounded font-bold hover:bg-[#11545c] transition-colors duration-300"
          >
            {t("SeeAll")}
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-8 md:grid-cols-2 sm:grid-cols-1">
          {products.map((p) => {
            return (
              <div
                key={p.id}
                className="bg-white dark:bg-slate-800 p-6 flex flex-col justify-between rounded-lg shadow hover:shadow-lg transition-shadow duration-300  h-[450px] "
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
                    className="text-indigo-500 hover:text-indigo-700 hover:underline transition duration-200 mt-2"
                  >
                    {t("learnMore")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>
      <motion.section
        whileInView={productAnimate.whileInView}
        initial={productAnimate.Initial}
        viewport={{ once: true }}
        transition={{
          ease: "easeInOut",
          duration: 1,
          delay: 0.7,
        }}
        className="px-[4%] mb-5"
      >
        <Title titleName={t("latestProductTitle")} />
        <div className="flex justify-end mb-3">
          <Link
            href="/blog"
            className="bg-[#11545c] text-white py-2 px-6 rounded font-bold hover:bg-[#11545c] transition-colors duration-300"
          >
            {t("SeeAll")}
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-8 md:grid-cols-2 sm:grid-cols-1">
          {blogs.slice(0, 4).map((blog) => {
            const date = blog.created_at.split("T")[0];

            return (
              <div
                key={blog.id}
                className="bg-white dark:bg-slate-800 flex flex-col justify-between p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300   "
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={blog.image_url}
                    width={200}
                    height={200}
                    alt="image"
                    className="rounded mb-4 object-cover w-[300px] h-[200px]"
                  />
                  <span>{date}</span>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 text-center">
                    {`${blog.description
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")} ...`}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <Link
                    href={`/blog/${blog.id}`}
                    className="text-indigo-500 hover:text-indigo-700 hover:underline transition duration-200 mt-2"
                  >
                    {t("learnMore")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>
    </>
  );
}
