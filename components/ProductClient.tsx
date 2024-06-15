"use client";
import { deleteProduct, handleAddToCart } from "@/app/actions";
import { ProductFromVercel } from "@/app/interface";
import Link from "next/link";
import { BsCartCheckFill } from "react-icons/bs";
import Loader from "./Loader";
import Title from "./Title";
import { useEffect, useState } from "react";
import { useI18n } from "@/locales/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Autocomplete, TextField } from "@mui/material";
import AddNewProduct from "./AddNewProduct";
import EditProduct from "./EditProduct";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HomeClientProps {
  products: ProductFromVercel[];
}

interface User {
  role: string[];
  [key: string]: any; // other properties
}

export default function ProductClient({ products }: HomeClientProps) {
  const [resetProduct, setResetProduct] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const { user } = useUser() as unknown as { user: User }; // Type assertion
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
        {isClient ? (
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
        ) : (
          ""
        )}

        <button
          onClick={handleSortChange}
          className="bg-blue-500 p-2 px-4 text-white font-bold rounded-r dark:bg-blac md:mt-2"
        >
          {resetProduct ? t("resetProduct") : t("sortByPrice")}
        </button>
      </form>
      <AddNewProduct />
      {loader ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-4 grid-rows-2 justify-between gap-4 pb-20 pt-5 md:grid-cols-1">
          {filteredProducts.map((p) => {
            const isAdmin = user?.role.includes("admin");
            return (
              <div
                key={p.id}
                className="bg-white flex flex-col justify-between dark:bg-slate-800 p-5 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col">
                  {isAdmin && (
                    <>
                      <button onClick={() => handleDelete(+p.id)}>
                        delete
                      </button>
                      <EditProduct product={p} />
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
                  {p.image_gallery?.[0]?.image_url ? (
                    <Image
                      src={p.image_gallery[0].image_url}
                      width={100}
                      height={100}
                      alt="image"
                    />
                  ) : (
                    <Image
                      src="/path/to/default/image.jpg"
                      width={100}
                      height={100}
                      alt="default image"
                    />
                  )}
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
