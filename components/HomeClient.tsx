"use client";
import React, { ChangeEvent, useState } from "react";
import Product from "./Product";
import Title from "./Title";
import Loader from "./Loader";
import { useTranslation } from "react-i18next";
import { ProductData } from "@/app/interface";

interface HomeClientProps {
  prdata: ProductData[];
}

export default function HomeClient({ prdata }: HomeClientProps) {
  const [originalProductsData] = useState<ProductData[]>(prdata);
  const [productsData, setProductsData] = useState<ProductData[]>(prdata);
  const [resetProduct, setResetProduct] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [sortTimeout, setSortTimeout] = useState<NodeJS.Timeout | null>(null);
  const [loader, setLoader] = useState<boolean>(false);
  const { t } = useTranslation();

  // debounce function
  const debounce = (fn: Function, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };

  // use debounced function on my search input

  const debouncedHandleChange = debounce((searchValue: string) => {
    const filteredProducts = originalProductsData?.filter((prod) =>
      prod.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    const sortedProductTyping = resetProduct
      ? filteredProducts.sort((a, b) => a.price - b.price)
      : filteredProducts;
    setProductsData(sortedProductTyping);
    setLoader(false);
  }, 2000);

  const handleSortChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setResetProduct(!resetProduct);
    setLoader(true);

    if (sortTimeout) {
      clearTimeout(sortTimeout);
    }

    const newTimeout = setTimeout(() => {
      const sortedProducts = [...productsData].sort(
        (a, b) => a.price - b.price
      );
      setProductsData(sortedProducts);
      setLoader(false);
    }, 2000);

    setSortTimeout(newTimeout);
  };

  // Inside handleChange function, filter original data instead of current data
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    const searchValue = e.target.value.toLowerCase();
    const filteredProducts = originalProductsData.filter((prod) =>
      prod.title.toLowerCase().includes(searchValue)
    );
    setProductsData(filteredProducts);
    setLoader(true);
    debouncedHandleChange(e.target.value);
  };

  return (
    <section className="px-[4%] min-h-screen bg-white dark:bg-slate-900">
      <Title titleName="productTitle" />
      <form className="flex items-center justify-center mt-4">
        <input
          value={search}
          onChange={handleChange}
          className="rounded-l border border-gray-300 outline-none p-2 w-64 mr-8 focus:ring-blue-500 focus:border-blue-500"
          placeholder={t("search")}
          type="text"
        />
        <button
          onClick={handleSortChange}
          className="bg-blue-500 p-2 px-4 text-white font-bold rounded-r dark:bg-black"
        >
          {resetProduct ? t("resetProduct") : t("sortByPrice")}
        </button>
      </form>
      {loader ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-4 grid-rows-2 justify-between gap-4 pb-20 pt-5 md:grid-cols-1">
          {productsData?.map((prod) => (
            <Product
              key={prod.id}
              id={prod.id}
              thumbnail={prod.thumbnail}
              description={prod.description}
              price={prod.price}
              title={prod.title}
            />
          ))}
        </div>
      )}
    </section>
  );
}
