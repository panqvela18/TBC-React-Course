"use client";
import Image from "next/image";
import logo from "../public/icons8-logo.svg";
import Link from "next/link";
import { useI18n } from "@/locales/client";

export default function Footer() {
  const t = useI18n();

  return (
    <footer className="flex flex-col bg-blue-500 py-10 px-[4%] md:flex-col md:items-center dark:bg-black">
      <div className="flex items-center justify-between mb-5 md:flex-col">
        <Image
          src={logo}
          width={50}
          height={50}
          alt="logo"
          className="md:mb-4"
        />
        <nav className="flex items-center md:mb-4 md:flex-col">
          <Link
            href="/"
            className="text-white text-sm mr-2  hover:text-gray-200 md:mr:0 md:mb-4"
          >
            {t("TermsAndConditions")}
          </Link>
          <Link
            href="/"
            className="text-white text-sm  mr-2 hover:text-gray-200 md:mr:0 md:mb-4"
          >
            {t("footerAbout")}
          </Link>
          <Link
            href="/"
            className="text-white text-sm mr-2  hover:text-gray-200 md:mr:0 md:mb-4"
          >
            {t("footerContact")}
          </Link>
          <Link href="/" className="text-white text-sm hover:text-gray-200">
            {t("PrivacyPolicy")}
          </Link>
        </nav>
      </div>
      <div className="w-full h-[1px] bg-slate-200 md:hidden"></div>
      <div className="flex justify-between items-center mt-5 md:flex-col-reverse md:mt-0">
        <p className="text-white text-sm ">© 2024.{t("allRight")}</p>
        <div className="flex items-center md:mb-4">
          <input
            type="email"
            className="min-h-12 max-w-48 px-4 text-white text-base border border-white rounded-l bg-transparent focus:outline-none"
            id="Email"
            name="Email"
            placeholder="example@gmail.com"
          />
          <input
            className="min-h-12 px-4 border-none rounded-r bg-white text-black-500 text-base cursor-pointer dark:text-black"
            value={t("subscribe")}
            type="submit"
          />
        </div>
      </div>
    </footer>
  );
}
