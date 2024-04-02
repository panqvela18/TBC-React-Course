"use client";
import { productData } from "@/Data/ProductData";
import Loader from "@/components/Loader";
import Product from "@/components/Product";
import Title from "@/components/Title";
import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState(productData);
  const [resetProduct, setResetProduct] = useState(false);
  const [search, setSearch] = useState("");
  const [sortTimeout, setSortTimeout] = useState(null);
  const [loader, setLoader] = useState(false);

  // debounce function
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // use debounced function on my search input

  const debouncedHandleChange = debounce((searchValue) => {
    const filteredProducts = productData.filter((prod) =>
      prod.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    const sortedProductTyping = resetProduct
      ? filteredProducts.sort((a, b) => a.price - b.price)
      : filteredProducts;
    setProduct(sortedProductTyping);
    setLoader(false);
  }, 2000);

  // Sorting function
  const handleSortChange = (e) => {
    e.preventDefault();
    setResetProduct(!resetProduct);
    setLoader(true);

    if (sortTimeout) {
      clearTimeout(sortTimeout);
    }

    // Set a new timeout
    const newTimeout = setTimeout(() => {
      if (!resetProduct) {
        const sortedProducts = [...product].sort((a, b) => a.price - b.price);
        setProduct(sortedProducts);
        setLoader(false);
      } else {
        setProduct(
          productData.filter((pro) =>
            pro.name.toLowerCase().includes(search.toLowerCase())
          )
        );
        setLoader(false);
      }
    }, 2000);

    setSortTimeout(newTimeout);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    debouncedHandleChange(e.target.value);
    setLoader(true);
  };

  return (
    <section className="px-[4%] min-h-screen bg-[aliceblue]">
      <Title titleName="PRODUCTS" />
      <form className="flex items-center justify-center mt-4">
        <input
          value={search}
          onChange={handleChange}
          className="rounded-l border border-gray-300 outline-none p-2 w-64 mr-8 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search Product"
          type="text"
        />
        <button
          onClick={handleSortChange}
          className="bg-blue-500 p-2 px-4 text-white font-bold rounded-r"
        >
          {resetProduct ? "Reset Products" : "Sort By Price"}
        </button>
      </form>
      {loader ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-4 grid-rows-2 justify-between gap-4 pb-20 pt-5 md:grid-cols-1">
          {product.map((prod) => (
            <Product
              key={prod.id}
              img={prod.img}
              name={prod.name}
              description={prod.description}
              price={prod.price}
            />
          ))}
        </div>
      )}
    </section>
  );
}
