"use client";
import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useI18n } from "@/locales/client";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { createAddBlogAction } from "@/app/actions";
import { blogData } from "@/app/interface";
import { PutBlobResult } from "@vercel/blob";
import Image from "next/image";

export default function AddNewBlog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for image preview URL
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const t = useI18n();

  const initialValues = {
    title: "",
    description: "",
    image_url: "",
  };

  const blogValidation = Yup.object({
    title: Yup.string().min(20, t("Tooshort")).required(t("titleRequired")),
    description: Yup.string()
      .min(20, t("Tooshort"))
      .required(t("descriptionRequired")),
    image_url: Yup.string().required(t("imageRequired")),
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPreviewImage(null); // Reset preview image when modal is closed
  };

  const handleSubmit = async (
    values: blogData,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      await createAddBlogAction(values);
      resetForm();
      handleClose();
      router.refresh();
    } catch (error) {
      console.error("Error creating blog:", error);
    }
    setSubmitting(false);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];
    setLoading(true);

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;
      setFieldValue("image_url", newBlob.url);
      setPreviewImage(URL.createObjectURL(file)); // Set preview image URL
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded"
        onClick={handleOpen}
      >
        {t("addBlog")}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={blogValidation}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched, isSubmitting, isValid }) => (
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  {t("title")}
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
                    errors.title && touched.title ? "border-red-500" : ""
                  }`}
                  id="title"
                  name="title"
                  type="text"
                  placeholder={t("title")}
                />
                {errors.title && touched.title && (
                  <p className="text-red-500 text-xs italic">{errors.title}</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t("description")}
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
                    errors.description && touched.description
                      ? "border-red-500"
                      : ""
                  }`}
                  name="description"
                  as="textarea"
                  placeholder={t("description")}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-xs italic">
                    {errors.description}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {t("image")}
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 bg-white text-black leading-tight focus:outline-none focus:shadow-outline ${
                    errors.image_url && touched.image_url
                      ? "border-red-500"
                      : ""
                  }`}
                  type="file"
                  ref={inputFileRef}
                  onChange={(event) => handleFileUpload(event, setFieldValue)}
                />
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    className="mt-2 rounded-lg shadow-md"
                    style={{ maxWidth: "100%", maxHeight: "200px" }}
                  />
                )}
                {loading && <p>{t("upload")}...</p>}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className={`bg-[#11545c] hover:bg-[#11545c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    isSubmitting || loading || !isValid
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  type="submit"
                  disabled={isSubmitting || loading || !isValid}
                >
                  {t("addBlog")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
