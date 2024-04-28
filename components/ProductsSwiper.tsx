import { ProductData } from "@/app/interface";
import Product from "./Product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductsSwiperProps {
  products: ProductData[];
  category: string;
  id: string | number;
}

export default function ProductsSwiper({
  products,
  category,
  id,
}: ProductsSwiperProps) {
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
      {products
        .filter((prod) => prod.category === category)
        .filter((prod) => prod.id !== id)
        .map((prod) => {
          return (
            <SwiperSlide className="grid grid-cols-4 gap-2" key={prod.id}>
              <div className="h-[500px] mr-4">
                <Product
                  key={prod.id}
                  id={prod.id}
                  thumbnail={prod.thumbnail}
                  description={prod.description}
                  price={prod.price}
                  title={prod.title}
                />
              </div>
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
}
