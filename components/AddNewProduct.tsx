"use client";
import { createAddProductAction } from "@/app/actions";
import { Prod } from "@/app/interface";
import { Modal } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useI18n } from "@/locales/client";

export default function AddNewProduct() {
  const [open, setOpen] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [imageGallery, setImageGallery] = useState<
    { id: number; image_url: string; name: string }[]
  >([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const t = useI18n();

  const initialValues: Prod = {
    title: "",
    description: "",
    image_url: "",
    price: "",
    category: "",
    discount: 0,
    stock: 0,
    imageGallery: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required(t("titleRequired")),
    description: Yup.string().required(t("descriptionRequired")),
    image_url: Yup.string().required(t("imageRequired")),
    price: Yup.string()
      .matches(/^[0-9]+(\.[0-9]{1,2})?$/, t("PriceNumber"))
      .required(t("PriceRequiared")),
    category: Yup.string().required(t("categoryRequiared")),
    discount: Yup.string().required(t("discountRequiared")),
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
      await createAddProductAction(productData);
      resetForm();
      setImageGallery([]);
      handleClose();
      router.refresh();
    } catch (error) {
      console.error("Error creating product:", error);
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

    setFieldValue("image_url", newImageUrls[0]?.image_url || "");
    setImageGallery((prev) => [...prev, ...newImageUrls]);
    setLoading(false);
  };

  const handleDeleteImage = (id: number, setFieldValue: any) => {
    const newImageGallery = imageGallery.filter((image) => image.id !== id);
    setImageGallery(newImageGallery);
    setFieldValue("image_url", newImageGallery[0]?.image_url || "");
  };

  return (
    <>
      <button
        className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        {t("addnewproduct")}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-h-full overflow-y-auto w-full max-w-2xl">
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    </div>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {t("price")}
                  </label>
                  <Field
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    {t("addProduct")}
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
