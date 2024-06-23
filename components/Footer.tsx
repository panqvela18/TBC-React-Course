"use client";
import Image from "next/image";
import logo from "../public/light_logo (1).png";
import logoDark from "../public/logo.png";
import Link from "next/link";
import { useI18n } from "@/locales/client";

export default function Footer() {
  const t = useI18n();

  return (
    <footer className="flex flex-col bg-[#ced4da]  dark:bg-[#003049] py-10 px-[4%] md:flex-col md:items-center ">
      <div className="flex items-center justify-between mb-5 md:flex-col">
        <Link href={"/"}>
          <Image
            src={logo}
            width={50}
            height={50}
            alt="Picture of the author"
            className="hidden dark:block"
          />
          <Image
            src={logoDark}
            width={50}
            height={50}
            alt="Picture of the author"
            className="block dark:hidden"
          />
        </Link>
        <nav className="flex items-center md:mb-4 md:flex-col">
          <Link
            href="/"
            className="text-[#003049]    hover:text-[#1A5A77] dark:text-white text-sm mr-2  md:mr:0 md:mb-4"
          >
            {t("TermsAndConditions")}
          </Link>
          <Link
            href="/"
            className="text-[#003049] dark:text-white   hover:text-[#1A5A77] text-sm  mr-2 md:mr:0 md:mb-4"
          >
            {t("footerAbout")}
          </Link>
          <Link
            href="/"
            className="text-[#003049] dark:text-white   hover:text-[#1A5A77] text-sm mr-2  md:mr:0 md:mb-4"
          >
            {t("footerContact")}
          </Link>
          <Link
            href="/"
            className="text-[#003049] dark:text-white  hover:text-[#1A5A77] text-sm"
          >
            {t("PrivacyPolicy")}
          </Link>
        </nav>
      </div>
      <div className="w-full h-[1px] bg-slate-200 md:hidden"></div>
      <div className="flex justify-between items-center mt-5 md:flex-col-reverse md:mt-0">
        <p className="text-[#003049] dark:text-white hover:text-[#1A5A77] text-sm ">
          © 2024.{t("allRight")}
        </p>
        <div className="flex items-center md:mb-4">
          <input
            type="email"
            className="min-h-12 max-w-48 px-4 text-[#003049] dark:text-white  hover:text-[#1A5A77] text-base border border-white rounded-l bg-transparent focus:outline-none"
            id="Email"
            name="Email"
            placeholder="example@gmail.com"
          />
          <input
            className="min-h-12 px-4 border-none rounded-r bg-white text-[#003049] text-base cursor-pointer"
            value={t("subscribe")}
            type="submit"
          />
        </div>
      </div>
    </footer>
  );
}
