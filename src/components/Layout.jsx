import "../App.css";
import { productData } from "../Data/ProductData";
import Product from "./Product";
import Title from "./Title";

export default function Layout() {
  return (
    <section className="px-[4%]  bg-[aliceblue]">
      <Title titleName="PRODUCTS" />
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
      <div className="grid grid-cols-4 grid-rows-2 justify-between gap-4 pb-20 pt-5 md:grid-cols-1">
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
