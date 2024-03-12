import React, { useEffect, useState } from "react";
import logo from "../images/icons8-logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";

const Header = () => {
  const [showBugerMenu, setShowBurgerMenu] = useState(false);

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

  return (
    <header className="bg-blue-500 py-4 px-[4%] sticky top-0 left-0 z-10 ">
      <div className="container mx-auto flex justify-between items-center">
        <img onClick={() => setShowBurgerMenu(false)} src={logo} alt="Logo" />
        <nav className="flex items-center md:hidden">
          <a href="/" className="text-white text-sm mr-6 hover:text-gray-200">
            Home
          </a>
          <a href="/" className="text-white text-sm mr-6 hover:text-gray-200">
            About
          </a>
          <a href="/" className="text-white text-sm hover:text-gray-200">
            Contact
          </a>
        </nav>
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
            <a
              onClick={() => setShowBurgerMenu(false)}
              href="/"
              className="text-white text-sm  p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              Home
            </a>
            <a
              onClick={() => setShowBurgerMenu(false)}
              href="/"
              className="text-white text-sm  p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              About
            </a>
            <a
              onClick={() => setShowBurgerMenu(false)}
              href="/"
              className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
