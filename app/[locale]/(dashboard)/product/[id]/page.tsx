import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import ProductDetailInfo from "@/components/ProductDetailInfo";
// import ProductsSwiper from "@/components/ProductsSwiper";
import { ProdDetail } from "@/app/interface";
// import Api from "@/Data/Api";

// export async function fetchAllProduct() {
//   const res = await fetch("https://dummyjson.com/products");
//   const products = await res.json();
//   console.log(products);

//   return products;
// }
// export const fetchProducts = async () => {
//   try {
//     const response = await Api.get("products");
//     return response.data.products;
//   } catch (error) {
//     console.log(error);
//   }
// };

export async function generateStaticParams() {
  try {
    const res = await fetch("https://dummyjson.com/products");
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    return data.products.map((product: { id: number }) => ({
      id: `${product.id}`,
    }));
  } catch (error) {
    console.error("Error fetching or processing products:", error);
    return [];
  }
}

async function fetchProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product = await res.json();

  return product;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const product: ProdDetail = await fetchProduct(id);

  // const products = await fetchAllProduct();

  return (
    <main className="px-[4%] bg-white dark:bg-slate-900">
      <div className="flex items-center justify-center pt-6">
        <h1 className="text-center mr-2 text-gray-500 font-bold text-2xl underline">
          {product.title}
        </h1>
        <div className="flex items-center">
          <FaStar color="yellow" />
          <span className="ml-1">{product.rating} out of 5</span>
        </div>
      </div>
      <section className="flex items-center justify-center py-16">
        {product && (
          <Image
            width={500}
            height={500}
            src={product.thumbnail}
            alt={product.title}
            className="mr-20 rounded h-[400px] object-cover object-center"
            priority
          />
        )}

        <div className="w-80 flex flex-col">
          <ProductDetailInfo info={"Brand:"} detail={product.brand} />
          <ProductDetailInfo info={"Category:"} detail={product.category} />
          <ProductDetailInfo
            info={"discountPercentage:"}
            detail={`${product.discountPercentage}%`}
          />
          <ProductDetailInfo info={"Price:"} detail={`${product.price}$`} />
          <p className="text-gray-700 text-base mb-6">{product.description}</p>
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
          {product &&
            product.images.map((img: string, index: number) => (
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
      {/* <section>
        <h3 className="text-center pt-6 text-gray-600 font-bold text-2xl underline mb-6">
          Similar Products
        </h3>
        <ProductsSwiper
          products={products}
          category={product.category}
          id={product.id}
        />
      </section> */}
    </main>
    // <h1>{product.title}</h1>
  );
}
