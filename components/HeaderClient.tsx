"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/icons8-logo.svg";
import { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import moon from "../public/moon.svg";
import sun from "../public/sun.svg";
import { ThemeContext } from "@/app/providers/ThemeContext";
import { useI18n } from "../locales/client";
import ToggleLang from "./ToggleLang";
import CartBtn from "./CartBtn";
import { useRouter } from "next/navigation";

export default function HeaderClient({
  currentLang,
  user,
  totalQuantity,
}: {
  currentLang: any;
  user: any;
  totalQuantity: any;
}) {
  const [showBugerMenu, setShowBurgerMenu] = useState<boolean>(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const router = useRouter();

  console.log(user);
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
  }, [setTheme]);

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

  const t = useI18n();

  const handleLogin = () => {
    router.push("/api/auth/login");
  };

  // const handleLogoutClick = async () => {
  //   await handleLogout();
  //   router.push("/api/auth/logout");
  // };

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
          <Link
            href={"/admin"}
            className="text-white text-sm mr-6 hover:text-gray-200"
          >
            {t("admin")}
          </Link>
          {user ? (
            <Link
              href={"/api/auth/logout"}
              className="text-white text-sm hover:text-gray-200"
            >
              {t("logout")}
            </Link>
          ) : (
            <button
              onClick={() => handleLogin()}
              className="text-white text-sm hover:text-gray-200"
            >
              {"Log In"}
            </button>
          )}
        </nav>
        <div className="flex items-center">
          <CartBtn totalQuantity={totalQuantity} />
          <ToggleLang currentLang={currentLang?.value} />
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
            <Link
              onClick={() => setShowBurgerMenu(false)}
              href={"admin"}
              className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              {t("admin")}
            </Link>
            <Link
              href={"/api/auth/logout"}
              className="text-white text-sm hover:text-gray-200"
            >
              {t("logout")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
