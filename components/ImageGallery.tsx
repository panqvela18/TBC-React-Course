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
            loop={true}
            spaceBetween={10}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed
                  ? thumbsSwiper
                  : undefined,
            }}
            modules={[FreeMode, Thumbs]}
            className="h-96 w-full rounded-lg"
          >
            {gallery.map((img, index) => (
              <SwiperSlide key={index} className="relative">
                <PhotoView src={img.image_url}>
                  <div className="flex h-full w-full justify-center cursor-pointer">
                    <Image
                      src={img.image_url}
                      alt="galleryImg"
                      width={300}
                      height={300}
                      className="block h-full w-full object-cover "
                    />
                  </div>
                </PhotoView>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbSwiper}
            loop={true}
            spaceBetween={12}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbs mt-3 h-32 w-full rounded-lg"
          >
            {gallery.map((img, index) => (
              <SwiperSlide key={index} className="relative group">
                <button className="flex h-full w-full items-center justify-center">
                  <Image
                    src={img.image_url}
                    alt="galleryImg"
                    width={300}
                    height={300}
                    className="block h-full w-full object-cover group-hover:before:opacity-0"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-0 transition-opacity"></div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </PhotoProvider>
  );
}
