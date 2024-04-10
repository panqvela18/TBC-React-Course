"use client"
import React, { useState } from 'react'
import Product from './Product';
import Title from './Title';
import Loader from './Loader';


export default function HomeClient({prdata}) {
  const [originalProductsData] = useState(prdata);
  const [productsData,setproductsData]=useState(prdata)
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
      const filteredProducts = originalProductsData?.filter((prod) =>
        prod.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      const sortedProductTyping = resetProduct
        ? filteredProducts.sort((a, b) => a.price - b.price)
        : filteredProducts;
      setproductsData(sortedProductTyping);
      setLoader(false);
    }, 2000);
  
  
    const handleSortChange = (e) => {
      e.preventDefault();
      setResetProduct(!resetProduct);
      setLoader(true);
    
      if (sortTimeout) {
        clearTimeout(sortTimeout);
      }
    
      const newTimeout = setTimeout(() => {
        const sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
        setproductsData(sortedProducts);
        setLoader(false);
      }, 2000);
    
      setSortTimeout(newTimeout);
    };
    

  // Inside handleChange function, filter original data instead of current data
  const handleChange = (e) => {
    setSearch(e.target.value);
    const searchValue = e.target.value.toLowerCase();
    const filteredProducts = originalProductsData.filter((prod) =>
      prod.title.toLowerCase().includes(searchValue)
    );
    setproductsData(filteredProducts);
    setLoader(true);
    debouncedHandleChange(e.target.value);
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
          {productsData?.map((prod) => (
            <Product
              id={prod.id}
              key={prod.id}
              img={prod.thumbnail}
              name={prod.title}
              description={prod.description}
              price={prod.price}
            />
          ))}
        </div>
      )}
    </section>
  )
}
