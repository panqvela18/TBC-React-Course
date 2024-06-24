"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/light_logo (1).png";
import logoDark from "../public/logo.png";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { useI18n } from "../locales/client";
import ToggleLang from "./ToggleLang";
import CartBtn from "./CartBtn";
import { useRouter } from "next/navigation";
import DarkMode from "./ChangeTheme";
import DropDown from "./DropDown";
import { IoLogIn } from "react-icons/io5";

export default function HeaderClient({
  currentLang,
  user,
  totalQuantity,
}: // userRole,
{
  currentLang: any;
  user: any;
  totalQuantity: number;
}) {
  const [showBugerMenu, setShowBurgerMenu] = useState<boolean>(false);
  const router = useRouter();

  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return (
    <header
      className={`bg-[#ced4da] dark:bg-[#003049] py-4 px-[4%] sticky top-0 left-0 z-10 `}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} prefetch={false}>
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
        <nav className="flex items-center md:hidden w-[30%] justify-between">
          <div className=" cursor-pointer after:content-[''] after:h-1 after:bg-[#11545c] after:w-full after:block after:scale-x-0 after:transition-transform after:transition-duration-[500ms] after:hover:scale-x-100">
            <Link
              href={"/about"}
              prefetch={false}
              className="text-[#003049] dark:text-white text-sm  hover:text-[#1A5A77] active:text-red-600"
            >
              {t("about")}
            </Link>
          </div>
          <div className=" cursor-pointer after:content-[''] after:h-1 after:bg-[#11545c] after:w-full after:block after:scale-x-0 after:transition-transform after:transition-duration-[500ms] after:hover:scale-x-100">
            <Link
              href={"/product"}
              prefetch={false}
              className="text-[#003049] dark:text-white text-sm  hover:text-[#1A5A77]"
            >
              {t("product")}
            </Link>
          </div>
          <div className=" cursor-pointer after:content-[''] after:h-1 after:bg-[#11545c] after:w-full after:block after:scale-x-0 after:transition-transform after:transition-duration-[500ms] after:hover:scale-x-100">
            <Link
              href={"/blog"}
              prefetch={false}
              className="text-[#003049] dark:text-white text-sm  hover:text-[#1A5A77]"
            >
              {t("blog")}
            </Link>
          </div>
          <div className=" cursor-pointer after:content-[''] after:h-1 after:bg-[#11545c] after:w-full after:block after:scale-x-0 after:transition-transform after:transition-duration-[500ms] after:hover:scale-x-100">
            <Link
              href={"/contact"}
              prefetch={false}
              className="text-[#003049] dark:text-white text-sm  hover:text-[#1A5A77]"
            >
              {t("contact")}
            </Link>
          </div>
        </nav>
        <div className="flex items-center">
          {user && <CartBtn totalQuantity={totalQuantity} />}
          <ToggleLang currentLang={currentLang?.value} />
          <DarkMode />

          {!isMobileOrTablet &&
            (user ? (
              <DropDown />
            ) : (
              <IoLogIn
                className="text-4xl text-[#003049] dark:text-white cursor-pointer"
                onClick={handleLogin}
              />
            ))}
        </div>
        {showBugerMenu ? (
          <MdOutlineClose
            onClick={() => setShowBurgerMenu(false)}
            className="text-3xl text-black dark:text-white"
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
            <div className="cursor-pointer">
              <Link
                onClick={() => setShowBurgerMenu(false)}
                href={"/"}
                prefetch={false}
                className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
              >
                {t("home")}
              </Link>
            </div>
            <div className="cursor-pointer">
              <Link
                onClick={() => setShowBurgerMenu(false)}
                href={"about"}
                prefetch={false}
                className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
              >
                {t("about")}
              </Link>
            </div>
            <div className="cursor-pointer">
              <Link
                onClick={() => setShowBurgerMenu(false)}
                href={"blog"}
                prefetch={false}
                className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
              >
                {t("blog")}
              </Link>
            </div>
            <div className="cursor-pointer">
              <Link
                onClick={() => setShowBurgerMenu(false)}
                href={"contact"}
                prefetch={false}
                className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
              >
                {t("contact")}
              </Link>
            </div>
            {user ? (
              <>
                <div className="cursor-pointer">
                  <Link
                    onClick={() => setShowBurgerMenu(false)}
                    href="/profile"
                    prefetch={false}
                    className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
                  >
                    {t("profile")}
                  </Link>
                </div>
                <div className="cursor-pointer">
                  <Link
                    onClick={() => setShowBurgerMenu(false)}
                    href="/admin"
                    prefetch={false}
                    className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
                  >
                    {t("admin")}
                  </Link>
                </div>
                <div className="cursor-pointer">
                  <a
                    href={`/api/auth/logout`}
                    className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
                  >
                    {t("logout")}
                  </a>
                </div>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
              >
                {t("login")}
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
