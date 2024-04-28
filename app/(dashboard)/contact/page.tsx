"use client";
import ContactInfo from "@/components/ContactInfo";
import { useState } from "react";
import contactImage from "../../../public/contact-image2.jpg";
import { BsTelephoneFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { HiOfficeBuilding } from "react-icons/hi";
import Image from "next/image";
import Input from "@/components/Input";
import Title from "@/components/Title";
import { useTranslation } from "react-i18next";

export default function Page() {
  const [contactType, setContactType] = useState<string>("staticContact");
  const { t } = useTranslation();

  return (
    <main className="py-8 bg-white dark:bg-slate-900">
      <Title titleName="contactTitle" />
      <div className="flex items-center justify-center mb-5">
        <span
          onClick={() => setContactType("staticContact")}
          style={{
            fontSize: "clamp(0.875rem, 0.6731rem + 0.8974vw, 1.75rem)",
          }}
          className={`mr-10 ${
            contactType === "staticContact"
              ? "border-b text-blue-400 dark:text-gray-400"
              : "text-gray-400 dark:text-gray-200"
          } p-2  font-bold cursor-pointer text-2xl`}
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
              ? "border-b text-blue-400 dark:text-gray-400"
              : "text-gray-400 dark:text-gray-200"
          } p-2  font-bold cursor-pointer text-2xl`}
        >
          {t("messageUs")}
        </span>
      </div>
      {contactType === "staticContact" ? (
        <section className="px-[20%] py-4  md:px-[4%]">
          <div className="flex justify-between bg-white filter drop-shadow-xl rounded md:flex-col-reverse dark:bg-black">
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
              className="rounded w-1/2 object-cover select-none  md:w-full"
              src={contactImage}
              alt="contact-img"
            />
          </div>
        </section>
      ) : (
        <section className="px-[20%] py-4 md:px-[4%] ">
          <form className="bg-white rounded p-10 md:p-4 dark:bg-black">
            <div className="flex items-center justify-between md:flex-col">
              <div className="flex flex-col w-1/2 mr-2 md:w-full">
                <Input labelName={t("name")} placeholder="John" />
              </div>
              <div className="flex flex-col w-1/2 md:w-full">
                <Input labelName={t("surname")} placeholder="Doe" />
              </div>
            </div>
            <div className="flex flex-col mt-2">
              <Input labelName={t("email")} placeholder="example@gmail.com" />
            </div>
            <div className="flex flex-col">
              <label className="text-blue-300 mb-2 text-lg font-semibold mt-2 dark:text-slate-50">
                {t("message")}
              </label>
              <textarea
                placeholder={`${t("message")}...`}
                className="border outline-none p-3 text-blue-300 rounded resize-none h-[300px] dark:text-slate-50"
              />
            </div>
            <button className="mt-2 w-full transition duration-300 ease-in-out transform bg-blue-300 p-2 border rounded text-white font-bold  hover:bg-blue-200 hover:text-black hover:border hover:rounded hover:scale-105 dark:bg-slate-50 dark:text-black dark:hover:bg-slate-900 dark:hover:border-none dark:hover:text-white">
              {t("send")}
            </button>
          </form>
        </section>
      )}
    </main>
  );
}
