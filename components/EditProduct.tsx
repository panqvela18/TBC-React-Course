"use client";
import { editProductAction } from "@/app/actions";
import { Prod, ProductFromVercel } from "@/app/interface";
import { Modal } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useI18n } from "@/locales/client";

interface EditProduct {
  product: ProductFromVercel;
}

export default function EditProduct({ product }: EditProduct) {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageGallery, setImageGallery] = useState<
    { id: number; image_url: string; name: string }[]
  >(product?.image_gallery || []);

  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const t = useI18n();

  const id = product.id;

  useEffect(() => {
    setImageGallery(product?.image_gallery || []);
  }, [product?.image_gallery]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: Prod = {
    id: Number(id),
    title: product.title,
    description: product.description,
    image_url: product.image_url,
    price: product.price,
    category: product.category,
    discount: product.discount,
    stock: product.stock,
    imageGallery: product.image_gallery || [],
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(10, t("Tooshort"))
      .max(255, t("Toolong"))
      .required(t("titleRequired")),
    description: Yup.string()
      .min(10, t("Tooshort"))
      .max(255, t("Toolong"))
      .required(t("descriptionRequired")),
    image_url: Yup.string().required(t("imageRequired")),
    price: Yup.string()
      .matches(/^[0-9]+(\.[0-9]{1,2})?$/, t("PriceNumber"))
      .required(t("PriceRequiared")),
    category: Yup.string().required(t("categoryRequiared")),
    discount: Yup.string()
      .matches(/^[0-9]+(\.[0-9]{1,2})?$/, t("PriceNumber"))
      .required(t("discountRequiared")),
    stock: Yup.string()
      .matches(/^[0-9]+$/, t("StockNumber"))
      .required(t("StockRequired")),
  });

  const handleSubmit = async (values: Prod, { resetForm }: any) => {
    const productData = { ...values, imageGallery };

    if (imageGallery.length === 0) {
      alert("Image cannot be empty");
      return;
    }

    try {
      await editProductAction(productData);
      console.log("Product edited successfully");
      resetForm();
      handleClose();
      router.refresh();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (!e.target.files) {
      throw new Error("No file selected");
    }

    const files = Array.from(e.target.files);
    const newImageUrls: { id: number; image_url: string; name: string }[] = [];
    setLoading(true);

    const startId = imageGallery.length + 1;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const response = await fetch(`/api/upload?filename=${file.name}`, {
          method: "POST",
          body: file,
        });

        const newBlob = await response.json();
        console.log("File uploaded successfully:", newBlob);

        newImageUrls.push({
          id: startId + i,
          image_url: newBlob.url,
          name: file.name,
        });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setFieldValue("image_url", newImageUrls[0]?.image_url || ""); // Set the first image as the main image URL
    setImageGallery((prev) => [...prev, ...newImageUrls]);
    setLoading(false);
  };

  const handleDeleteImage = (id: number, setFieldValue: any) => {
    const newImageGallery = imageGallery.filter((image) => image.id !== id);
    setImageGallery(newImageGallery);
    if (newImageGallery.length > 0) {
      setFieldValue("image_url", newImageGallery[0].image_url);
    } else {
      setFieldValue("image_url", "");
    }
  };

  const handleMoveToFirst = (id: number, setFieldValue: any) => {
    setImageGallery((prev) => {
      const index = prev.findIndex((image) => image.id === id);
      if (index > -1) {
        const [selectedImage] = prev.splice(index, 1);
        const updatedGallery = [selectedImage, ...prev];
        setFieldValue("image_url", updatedGallery[0].image_url);
        return updatedGallery;
      }
      return prev;
    });
  };

  return (
    <>
      <CiEdit
        className="cursor-pointer mr-3"
        onClick={handleOpen}
        fontSize={30}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl max-h-full overflow-y-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="w-full">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    {t("title")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    name="title"
                    type="text"
                    placeholder={t("title")}
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("description")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    name="description"
                    as="textarea"
                    placeholder={t("description")}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("image")}
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    type="file"
                    ref={inputFileRef}
                    onChange={(e) => handleFileChange(e, setFieldValue)}
                    multiple
                  />
                  {loading && <p>{t("uploading")}...</p>}
                  <ErrorMessage
                    name="image_url"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  {imageGallery.map((image) => (
                    <div key={image.id} className="flex items-center mb-2">
                      <Image
                        src={image.image_url}
                        alt={"gallery-image"}
                        className="w-16 h-16 object-cover mr-2"
                        width={64}
                        height={64}
                      />
                      <span className="mr-2">{image.name}</span>
                      <button
                        type="button"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        onClick={() =>
                          handleDeleteImage(image.id, setFieldValue)
                        }
                      >
                        {t("delete")}
                      </button>
                      <button
                        type="button"
                        className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-1 px-2 rounded ml-2"
                        onClick={() =>
                          handleMoveToFirst(image.id, setFieldValue)
                        }
                      >
                        {t("Makeprimary")}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("price")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    name="price"
                    type="text"
                    placeholder={t("price")}
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("category")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                    name="category"
                    type="text"
                    placeholder={t("category")}
                  />
                  <ErrorMessage
                    name="category"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("discount")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="discount"
                    name="discount"
                    type="text"
                    placeholder={t("discount")}
                  />
                  <ErrorMessage
                    name="discount"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("stock")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black  leading-tight focus:outline-none focus:shadow-outline"
                    id="stock"
                    name="stock"
                    type="text"
                    placeholder={t("stock")}
                  />
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={loading || isSubmitting}
                  >
                    {t("edit")}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
}
