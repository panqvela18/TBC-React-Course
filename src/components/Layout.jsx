import "../App.css";
import { productData } from "../Data/ProductData";
import Product from "./Product";

export default function Layout() {
  return (
    <section className="px-[4%] flex-grow overflow-y-auto custom-scrollbar bg-[aliceblue]">
      <div className="flex items-center justify-center py-2">
        <h1
          style={{
            fontSize: "clamp(1rem, 0.5385rem + 2.0513vw, 3rem)",
          }}
          className="inline-block border-b-2 pb-2 text-blue-500 font-bold"
        >
          PRODUCTS
        </h1>
      </div>
      <form className="flex items-center justify-center mt-4">
        <input
          className="rounded-l border border-gray-300 outline-none p-2 w-64 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Product"
          type="text"
        />
        <button
          onClick={(e) => e.preventDefault()}
          className="bg-blue-500 p-2 px-4 text-white font-bold rounded-r"
        >
          SEARCH
        </button>
      </form>
      <div className="grid grid-cols-4 grid-rows-2 justify-between gap-4 px-[4%] pb-20 pt-5">
        {productData.map((product) => (
          <Product
            key={product.id}
            img={product.img}
            name={product.name}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </section>
  );
}
