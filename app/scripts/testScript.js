import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const { t, i18n: translation } = useTranslation();

export const toggleLanguage = () => {
  const currentLanguage = translation.language;
  const nextLanguage = currentLanguage === "en" ? "ka" : "en";
  //   setLang(lang === "en" ? "კა" : "en")
  i18n.changeLanguage(nextLanguage);
};
