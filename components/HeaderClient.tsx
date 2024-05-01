"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/icons8-logo.svg";
import { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
// import ukFlag from "../public/uk.svg";
// import geoFlag from "../public/Flag_of_Georgia.svg.png";
import moon from "../public/moon.svg";
import sun from "../public/sun.svg";
import { handleLogout } from "@/app/scripts/logout";
import { ThemeContext } from "@/app/providers/ThemeContext";
import { useChangeLocale, useI18n } from "../locales/client";

export default function HeaderClient() {
  const [showBugerMenu, setShowBurgerMenu] = useState<boolean>(false);
  // const [lang, setLang] = useState<string>("en");

  const { theme, setTheme } = useContext(ThemeContext);

  console.log(theme);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };
    prefersDarkMode.addEventListener("change", handleChange);
    return () => {
      prefersDarkMode.removeEventListener("change", handleChange);
    };
  }, []);
  // const { t } = useTranslation();

  // const toggleLanguage = () => {
  //   const currentLanguage = i18n.language;
  //   const nextLanguage = currentLanguage === "en" ? "ka" : "en";
  //   setLang(lang === "en" ? "ka" : "en");
  //   i18n.changeLanguage(nextLanguage);
  // };

  // const handleClick = () => {
  //   // Toggle between "en" and "ka" languages
  //   const nextLang = lang === "en" ? "ka" : "en";
  //   setLang(nextLang);

  //   // Update localStorage with the new language
  //   localStorage.setItem("lang", nextLang);
  // };
  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  function handleThemeChange() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    if (showBugerMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showBugerMenu]);

  // function changeLanguage() {
  //   const paths = path.split("/");
  //   paths[1] = paths[1] === "en" ? "ka" : "en";
  //   const newPath = paths.join("/");
  //   router.replace(newPath);
  // }
  const changeLocale = useChangeLocale();
  // const locale = useCurrentLocale();
  const t = useI18n();

  return (
    <header className="bg-blue-500 py-4 px-[4%] sticky top-0 left-0 z-10 dark:bg-black">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={logo}
            width={50}
            height={50}
            alt="Picture of the author"
          />
        </Link>
        <nav className="flex items-center md:hidden">
          <Link
            href={"/"}
            className="text-white text-sm mr-6 hover:text-gray-200"
          >
            {t("home")}
          </Link>
          <Link
            href={"/about"}
            className="text-white text-sm mr-6 hover:text-gray-200"
          >
            {t("about")}
          </Link>
          <Link
            href={"/blog"}
            className="text-white text-sm mr-6 hover:text-gray-200"
          >
            {t("blog")}
          </Link>
          <Link
            href={"/contact"}
            className="text-white text-sm mr-6 hover:text-gray-200"
          >
            {t("contact")}
          </Link>
          <Link
            href={"/profile"}
            className="text-white text-sm mr-6 hover:text-gray-200"
          >
            {t("profile")}
          </Link>
          <button
            onClick={() =>
              handleLogout().then(() => {
                window.location.reload();
              })
            }
            className="text-white text-sm  hover:text-gray-200"
          >
            {t("logout")}
          </button>
        </nav>
        <div className="flex items-center">
          <button className="mr-4" onClick={() => changeLocale("en")}>
            ENG
          </button>
          <button className="mr-4" onClick={() => changeLocale("ka")}>
            KA
          </button>
          {/* <button className="mr-6" onClick={changeLocale}>
            {locale === "en" ? (
              <div className="flex items-center">
                <Image className="w-[20px]" src={geoFlag} alt="flag" />{" "}
                <span className="text-white text-sm hover:text-gray-200">
                  GE
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <Image className="w-[20px] mr-[2px]" src={ukFlag} alt="flag" />{" "}
                <span className="text-white text-sm hover:text-gray-200">
                  EN
                </span>
              </div>
            )}
          </button> */}
          <button onClick={handleThemeChange}>
            {theme === "dark" ? (
              <Image src={sun} alt="sun" width={30} height={30} />
            ) : (
              <Image src={moon} alt="moon" width={30} height={30} />
            )}
          </button>
        </div>
        {showBugerMenu ? (
          <MdOutlineClose
            onClick={() => setShowBurgerMenu(false)}
            className="text-3xl text-white"
          />
        ) : (
          <GiHamburgerMenu
            onClick={() => setShowBurgerMenu(true)}
            className="hidden text-3xl text-white md:block"
          />
        )}
      </div>
      {showBugerMenu && (
        <div className="min-h-dvh">
          <div className="h-[3px] w-full bg-white mt-3"></div>
          <nav className="flex flex-col items-center">
            <Link
              onClick={() => setShowBurgerMenu(false)}
              href={"/"}
              className="text-white text-sm  p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              {t("home")}
            </Link>
            <Link
              onClick={() => setShowBurgerMenu(false)}
              href={"about"}
              className="text-white text-sm  p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              {t("about")}
            </Link>
            <Link
              onClick={() => setShowBurgerMenu(false)}
              href={"blog"}
              className="text-white text-sm  p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              {t("blog")}
            </Link>
            <Link
              onClick={() => setShowBurgerMenu(false)}
              href={"contact"}
              className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              {t("contact")}
            </Link>
            <Link
              onClick={() => setShowBurgerMenu(false)}
              href={"profile"}
              className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              {t("profile")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
