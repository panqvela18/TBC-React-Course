"use client"
import { useTranslation } from "react-i18next";

export default function Title({titleName}) {

  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center py-10">
        <h1
          style={{
            fontSize: "clamp(1rem, 0.5385rem + 2.0513vw, 3rem)",
          }}
          className="inline-block border-b-2 pb-2 text-blue-500 font-bold dark:text-white"
        >
          {t(`${titleName}`)}
        </h1>
      </div>
  )
}
