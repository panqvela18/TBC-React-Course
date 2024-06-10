"use client";

import Image from "next/image";
import ukFlag from "../public/uk.svg";
import geoFlag from "../public/Flag_of_Georgia.svg.png";
import { changeLanguage } from "@/app/scripts/changeLanguage";

export default function ToggleLang({ currentLang }: { currentLang: string }) {
  const handleChangeLanguage = async () => {
    await changeLanguage();
    window.location.reload();
  };
  return (
    <button className="mr-2" onClick={handleChangeLanguage}>
      {currentLang === "en" ? (
        <div className="flex items-center">
          <Image className="w-[20px]" src={geoFlag} alt="flag" />{" "}
          <span className="text-white text-sm hover:text-gray-200">GE</span>
        </div>
      ) : (
        <div className="flex items-center">
          <Image className="w-[20px] mr-[2px]" src={ukFlag} alt="flag" />{" "}
          <span className="text-white text-sm hover:text-gray-200">EN</span>
        </div>
      )}
    </button>
  );
}
