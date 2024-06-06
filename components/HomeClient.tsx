"use client";
import React, { useState } from "react";
import Title from "./Title";
import Loader from "./Loader";
import { ProductFromVercel } from "@/app/interface";
import { useI18n } from "@/locales/client";
import { BsCartCheckFill } from "react-icons/bs";
import Link from "next/link";
import { deleteProduct, handleAddToCart } from "@/app/actions";
// import { debounce } from "@/app/utils";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import AddNewProduct from "./AddNewProduct";
import EditProduct from "./EditProduct";
import { Autocomplete, TextField } from "@mui/material";

interface HomeClientProps {
  products: ProductFromVercel[];
  userId: number;
  userRole: string;
}

export default function HomeClient({
  products,
  userId,
  userRole,
}: HomeClientProps) {
  const [resetProduct, setResetProduct] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const { user } = useUser();
  const router = useRouter();

  const t = useI18n();

  const handleSortChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setLoader(true);

    setTimeout(() => {
      setResetProduct(!resetProduct);
      setLoader(false);
    }, 2000);
  };

  // const handleSearch = () => {
  //   setLoader(false);
  // };

  // const debouncedHandleChange = debounce(handleSearch, 2000);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  //   setLoader(true);
  //   debouncedHandleChange(e.target.value);
  // };

  const handleAddToCartClick = (productId: string) => {
    if (!user) {
      router.push("/api/auth/login");
    } else {
      handleAddToCart(productId);
    }
  };

  const handleDelete = async (productId: number) => {
    await deleteProduct(productId);
  };

  let filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );

  if (resetProduct) {
    filteredProducts = filteredProducts.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  }

  return (
    <section className="px-[4%] min-h-screen bg-white dark:bg-slate-900">
      <Title titleName={t("productTitle")} />
      <form className="flex items-center justify-center mt-4 md:flex-col">
        {/* <input
          value={search}
          onChange={handleChange}
          className="rounded-l border border-gray-300 outline-none p-2 w-64 mr-8 focus:ring-blue-500 focus:border-blue-500"
          placeholder={t("search")}
          type="text"
        /> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={products}
          getOptionLabel={(option) => option.title}
          onChange={(_event, value) => {
            setSearch(value ? value.title : "");
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              onChange={(e) => setSearch(e.target.value)}
              {...params}
              label="Products"
            />
          )}
        />
        <button
          onClick={handleSortChange}
          className="bg-blue-500 p-2 px-4 text-white font-bold rounded-r dark:bg-blac md:mt-2"
        >
          {resetProduct ? t("resetProduct") : t("sortByPrice")}
        </button>
      </form>
      <AddNewProduct user_id={userId} />
      {loader ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-4 grid-rows-2 justify-between gap-4 pb-20 pt-5 md:grid-cols-1">
          {filteredProducts.map((p) => {
            const isAdmin = userRole === "admin";
            const isOwner = userId === p.user_id;
            return (
              <div
                key={p.id}
                className="bg-white flex flex-col justify-between dark:bg-slate-800 p-5 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col">
                  {(isAdmin || isOwner) && (
                    <>
                      <button onClick={() => handleDelete(+p.id)}>
                        delete
                      </button>
                      <EditProduct user_id={userId} product={p} />
                    </>
                  )}
                  <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {p.description}
                  </p>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-4 inline-block">
                    {p.category}
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-4 inline-block">
                    {p.price}
                  </span>
                  <Image
                    src={p.image_url ? p.image_url : ""}
                    width={100}
                    height={100}
                    alt="image"
                  />
                </div>
                <div className="flex flex-col">
                  <Link
                    href={`/product/${p.id}`}
                    className="text-blue-500 hover:text-blue-700 hover:underline transition duration-200 mt-2"
                  >
                    {t("learnMore")}
                  </Link>
                  <button
                    onClick={() => {
                      handleAddToCartClick(p.id.toString());
                    }}
                    className="mt-2 bg-blue-500 text-white flex items-center justify-center py-2 px-4 rounded font-bold hover:bg-blue-600 transition-colors duration-300"
                  >
                    Add to Cart
                    <BsCartCheckFill className="ml-3" color="white" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
