"use client";
import { createAddBlogAction } from "@/app/actions";
import { blogData } from "@/app/interface";
import { useI18n } from "@/locales/client";
import Modal from "@mui/material/Modal";
import { PutBlobResult } from "@vercel/blob";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function AddNewBlog() {
  const [open, setOpen] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
      console.error("Error creating user:", error);
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
                <Field type="hidden" name="image_url" />
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
