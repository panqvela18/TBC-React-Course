"use client";
import { handleAddToCart } from "@/app/actions";
import { ProductFromVercel } from "@/app/interface";
import Link from "next/link";
import { BsCartCheckFill } from "react-icons/bs";
import Loader from "./Loader";
import { useState } from "react";
import { useI18n } from "@/locales/client";
import { Autocomplete, TextField } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import image from "../public/pexels-solliefoto-320617 (1).jpg";

interface HomeClientProps {
  products: ProductFromVercel[];
}

export default function ProductClient({ products }: HomeClientProps) {
  const [resetProduct, setResetProduct] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user } = useUser();
  const router = useRouter();
  const t = useI18n();

  const showMoreProducts = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4);
  };

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

  const handleAddToCartClick = (productId: string) => {
    if (!user) {
      router.push("/api/auth/login");
    } else {
      handleAddToCart(productId);
      toast.success(t("productAddedToCart"), {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // Extract unique categories
  const uniqueCategories = Array.from(
    new Set(products.map((prod) => prod.category))
  );

  let filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );

  // Apply category filter
  if (selectedCategory !== null) {
    filteredProducts = filteredProducts.filter(
      (prod) => prod.category === selectedCategory
    );
  }

  // Apply price sorting
  if (resetProduct) {
    filteredProducts = filteredProducts.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  }

  return (
    <main>
      <div className="relative w-full h-screen">
        <Image
          src={image}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <section className="px-[4%] min-h-screen bg-[#adb5bd] dark:bg-slate-900">
        <form className="flex flex-col items-center mt-10 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            className="text-black dark:text-white"
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
                label={t("product")}
                variant="outlined"
                className="bg-white dark:bg-gray-800 dark:text-white rounded-md"
              />
            )}
          />
          <button
            onClick={handleSortChange}
            className="bg-[#11545c] hover:bg-[#0a3b4a] text-white font-bold px-4 py-2 rounded-md h-[56px] transition-colors duration-300"
          >
            {resetProduct ? t("resetProduct") : t("sortByPrice")}
          </button>
        </form>

        <div className="flex items-center justify-center mt-5 space-x-2 md:flex-wrap">
          <span className="mr-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("filterByCategory")}:
          </span>
          <button
            className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 mb-1 ${
              selectedCategory === null
                ? "bg-[#003049] text-white"
                : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            {t("allCategories")}
          </button>
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 rounded-md text-sm mb-1 transition-colors duration-300 ${
                selectedCategory === category
                  ? "bg-[#003049] text-white"
                  : "bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {loader ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-4 gap-4 pb-20 pt-5 md:grid-cols-2 sm:grid-cols-1">
            {filteredProducts.slice(0, visibleProducts).map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-slate-800 p-6 flex flex-col justify-between rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center">
                  {p.image_gallery?.[0]?.image_url ? (
                    <Image
                      src={p.image_gallery[0].image_url}
                      width={200}
                      height={200}
                      alt="image"
                      className="rounded mb-4 object-cover"
                    />
                  ) : (
                    <Image
                      src="/path/to/default/image.jpg"
                      width={200}
                      height={200}
                      alt="default image"
                      className="rounded mb-4 object-cover"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 text-center">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 text-center">
                    {`${p.description.split(" ").slice(0, 5).join(" ")} ...`}
                  </p>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 inline-block">
                    {p.category}
                  </span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-4 inline-block">
                    ${p.price}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <Link
                    href={`/product/${p.id}`}
                    className="text-[#003049] hover:text-[#1A5A77] dark:text-[#D3D3D3] dark:hover:text-[#A9A9A9] hover:underline transition duration-200 mt-2"
                  >
                    {t("learnMore")}
                  </Link>
                  <button
                    onClick={() => {
                      handleAddToCartClick(p.id.toString());
                    }}
                    className="mt-2 bg-[#11545c] hover:bg-[#0a3b4a] text-white flex items-center justify-center py-2 px-4 rounded-md font-bold transition-colors duration-300"
                  >
                    {t("addToCart")}
                    <BsCartCheckFill className="ml-3" color="white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {visibleProducts < filteredProducts.length && !loader && (
          <div className="flex justify-center py-5">
            <button
              onClick={showMoreProducts}
              className="px-4 py-2 bg-[#11545c] hover:bg-[#0a3b4a] text-white rounded-md transition-colors duration-300"
            >
              {t("seemore")}
            </button>
          </div>
        )}
        <ToastContainer
          position="bottom-right"
          hideProgressBar={false}
          autoClose={5000}
          theme="colored"
          newestOnTop={false}
          draggable
          pauseOnHover
          closeOnClick
        />
      </section>
    </main>
  );
}
