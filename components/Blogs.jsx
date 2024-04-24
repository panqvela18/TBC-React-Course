"use client"
import Image from "next/image";
import defaulImage from "../public/Teamwork.png";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Blogs({ title, description, date, id, tags }) {
  const {t} = useTranslation()
  return (
    <div className="flex flex-col bg-white filter drop-shadow-xl min-h-[400px] justify-between border border-[#e5e7eb] rounded dark:bg-slate-900">
      <div>
        <Image className="rounded-tl rounded-tr" src={defaulImage} alt="blog" />
        <div className="px-4">
          <h5 className="mt-[5px] text-slate-400">{date}</h5>
          <h3 className=" text-black text-xl font-bold mb-4 dark:text-slate-200">{title}</h3>
          <p className="text-medium_grey opacity-60 mb-4 dark:text-white">{`${description
            .split(" ")
            .slice(0, 30)
            .join(" ")} ...`}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center w-full p-4 flex-wrap">

        {tags.map((tag,index) => {
          return <button key={index} className="p-2 rounded-lg bg-slate-300 text-white mr-2 dark:bg-white dark:text-black">{tag}</button>;
        })}
        </div>
        <button className="bg-blue-500 p-4 text-white cursor-pointer w-full dark:bg-white dark:text-black">
          <Link href={`/blog/${id}`}>{t("seeMore")}</Link>
        </button>
      </div>
    </div>
  );
}
