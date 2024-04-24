"use client"
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductsSwiper({products,category,id}) {
  return (
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
          {products.products
            ?.filter((prod) => prod.category === category)
            .filter((prod) => prod.id !== id)
            .map((prod) => {
              return (
                <SwiperSlide className="grid grid-cols-4 gap-2" key={prod.id}>
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
  )
}
