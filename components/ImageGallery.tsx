"use client";
import { Gallery } from "@/app/interface";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function ImageGallery({ gallery }: { gallery: Gallery[] }) {
  const [thumbsSwiper, setThumbSwiper] = useState<any>(null);

  return (
    <PhotoProvider>
      <section>
        <div className="container">
          <Swiper
            loop={false}
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed
                  ? thumbsSwiper
                  : undefined,
            }}
            modules={[FreeMode, Thumbs]}
            className="main-swiper rounded-lg"
            initialSlide={0}
          >
            {gallery.map((img, index) => (
              <SwiperSlide key={index} className="relative">
                <PhotoView src={img.image_url}>
                  <button className="flex h-full w-full items-center justify-center">
                    <Image
                      src={img.image_url}
                      alt={`Image ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </button>
                </PhotoView>
              </SwiperSlide>
            ))}
          </Swiper>

          <Swiper
            onSwiper={setThumbSwiper}
            loop={false}
            spaceBetween={12}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbs mt-3 rounded-lg"
          >
            {gallery.map((img, index) => (
              <SwiperSlide key={index} className="relative group">
                <PhotoView src={img.image_url}>
                  <button className="flex h-full w-full items-center justify-center">
                    <Image
                      src={img.image_url}
                      alt={`Thumbnail ${index + 1}`}
                      width={120}
                      height={120}
                      objectFit="cover"
                      className="rounded-lg group-hover:opacity-75 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gray-300 dark:bg-black bg-opacity-50 dark:bg-opacity-50 group-hover:bg-opacity-0 transition-opacity dark:group-hover:bg-opacity-75"></div>
                  </button>
                </PhotoView>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </PhotoProvider>
  );
}
