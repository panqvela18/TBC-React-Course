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

  let filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );

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
        <form className="flex items-center justify-center md:flex-col mt-10 md:space-y-0 md:space-x-4">
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
                className="bg-white dark:bg-gray-800 dark:text-white rounded-l-md"
              />
            )}
          />
          <button
            onClick={handleSortChange}
            className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold px-4 rounded-r-md h-[56px]"
          >
            {resetProduct ? t("resetProduct") : t("sortByPrice")}
          </button>
        </form>

        {loader ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-4 grid-rows-2 justify-between gap-4 pb-20 pt-5 md:grid-cols-2 sm:grid-cols-1">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-slate-800 p-6 flex flex-col justify-between rounded-lg shadow hover:shadow-lg transition-shadow duration-300 "
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
                    className="mt-2 bg-[#11545c] hover:bg-[#11545c] text-white flex items-center justify-center py-2 px-4 rounded font-bold transition-colors duration-300"
                  >
                    {t("addToCart")}
                    <BsCartCheckFill className="ml-3" color="white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <ToastContainer position="bottom-right" />
      </section>
    </main>
  );
}
