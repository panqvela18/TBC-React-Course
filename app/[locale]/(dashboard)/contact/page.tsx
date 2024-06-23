"use client";
import ContactInfo from "@/components/ContactInfo";
import { useState } from "react";
import contactImage from "../../../../public/contact-image2.jpg";
import { BsTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { HiOfficeBuilding } from "react-icons/hi";
import Image from "next/image";
import Title from "@/components/Title";
import { useI18n } from "@/locales/client";
import { createContactAction } from "@/app/actions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { unstable_noStore as noStore } from "next/cache";

export default function Contact() {
  const [contactType, setContactType] = useState<string>("staticContact");
  const t = useI18n();
  const [messageSend, setMessageSend] = useState(false);

  noStore();
  const initialValues = {
    name: "",
    surname: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(t("Namerequired")),
    surname: Yup.string().required(t("Surnamerequired")),
    email: Yup.string().email(t("mailIsnotValid")).required(t("Emailrequired")),
    message: Yup.string()
      .min(10, t("minmessage"))
      .required(t("Messagerequired")),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      await createContactAction(values);
      setMessageSend(true);
      resetForm();
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <main className="py-8 bg-[#adb5bd] dark:bg-slate-900">
      <Title titleName={t("contactTitle")} />
      <div className="flex items-center justify-center mb-5">
        <span
          onClick={() => setContactType("staticContact")}
          style={{
            fontSize: "clamp(0.875rem, 0.6731rem + 0.8974vw, 1.75rem)",
          }}
          className={`mr-10 ${
            contactType === "staticContact"
              ? "border-b text-[#11545c] dark:text-gray-400"
              : "text-gray-400 dark:text-gray-200"
          } p-2 font-bold cursor-pointer text-2xl`}
        >
          {t("getInTouch")}
        </span>
        <span
          onClick={() => setContactType("messageUs")}
          style={{
            fontSize: "clamp(0.875rem, 0.6731rem + 0.8974vw, 1.75rem)",
          }}
          className={`${
            contactType === "messageUs"
              ? "border-b text-[#11545c] dark:text-gray-400"
              : "text-gray-400 dark:text-gray-200"
          } p-2 font-bold cursor-pointer text-2xl`}
        >
          {t("messageUs")}
        </span>
      </div>
      {contactType === "staticContact" ? (
        <section className="px-[20%] py-4 md:px-[4%]">
          <div className="flex justify-between bg-white filter drop-shadow-xl rounded md:flex-col-reverse dark:bg-[#1e293b]">
            <div className="px-20 py-10 w-1/2 flex flex-col justify-center md:w-full md:px-4 md:py-4">
              <ContactInfo
                iconImage={
                  <BsTelephoneFill
                    className="text-black dark:text-white"
                    fontSize={40}
                  />
                }
                info="+995 555 55 55 55"
              />
              <ContactInfo
                iconImage={
                  <GrMail
                    className="text-black dark:text-white"
                    fontSize={40}
                  />
                }
                info="example@gmail.com"
              />
              <ContactInfo
                iconImage={
                  <HiOfficeBuilding
                    className="text-black dark:text-white"
                    fontSize={40}
                  />
                }
                info="თბილისი"
              />
            </div>
            <Image
              className="rounded w-1/2 object-cover select-none md:w-full"
              src={contactImage}
              alt="contact-img"
            />
          </div>
        </section>
      ) : (
        <section className="px-[20%] py-4 md:px-[4%]">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white rounded p-10 md:p-4 dark:bg-[#1e293b]">
                <div className="flex items-center justify-between md:flex-col">
                  <div className="flex flex-col w-1/2 mr-2 md:w-full">
                    <label className="text-[#11545c] mb-2 text-lg font-semibold dark:text-slate-50">
                      {t("name")}
                    </label>
                    <Field
                      name="name"
                      type="text"
                      placeholder="John"
                      className="border outline-none p-3 text-[#11545c] rounded dark:bg-slate-900"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="flex flex-col w-1/2 md:w-full">
                    <label className="text-[#11545c] mb-2 text-lg font-semibold dark:text-slate-50">
                      {t("surname")}
                    </label>
                    <Field
                      name="surname"
                      type="text"
                      placeholder="Doe"
                      className="border outline-none p-3 text-[#11545c] rounded dark:bg-slate-900"
                    />
                    <ErrorMessage
                      name="surname"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <label className="text-[#11545c] mb-2 text-lg font-semibold dark:text-slate-50">
                    {t("email")}
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="example@gmail.com"
                    className="border outline-none p-3 text-[#11545c] rounded dark:bg-slate-900"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[#11545c] mb-2 text-lg font-semibold mt-2 dark:text-slate-50">
                    {t("message")}
                  </label>
                  <Field
                    as="textarea"
                    name="message"
                    placeholder={`${t("message")}...`}
                    className="border outline-none p-3 text-[#11545c] rounded resize-none h-[300px] dark:bg-slate-900"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                {messageSend && (
                  <p className="text-[#11545c] mb-2 text-lg font-semibold ">
                    {t("MessageSent")}
                  </p>
                )}
                <button
                  type="submit"
                  className="mt-2 w-full transition duration-300 ease-in-out transform bg-[#11545c] p-2 border rounded text-white font-bold hover:bg-[#1A5A77] hover:text-white hover:border hover:rounded hover:scale-105 dark:bg-slate-50 dark:text-black dark:hover:bg-slate-900 dark:hover:border-none dark:hover:text-white"
                  disabled={isSubmitting}
                >
                  {t("send")}
                </button>
              </Form>
            )}
          </Formik>
        </section>
      )}
    </main>
  );
}
