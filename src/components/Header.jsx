import React, { useEffect, useState } from "react";
import logo from "../images/icons8-logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";

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
        <Link to={"/"}><img onClick={() => setShowBurgerMenu(false)} src={logo} alt="Logo" /> </Link>
        <nav className="flex items-center md:hidden">
          <Link to={"/"} className="text-white text-sm mr-6 hover:text-gray-200">
            Home
          </Link>
          <Link to={"/about"} className="text-white text-sm mr-6 hover:text-gray-200">
            About
          </Link>
          <Link to={"/contact"} className="text-white text-sm hover:text-gray-200">
            Contact
          </Link>
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
            <Link
              onClick={() => setShowBurgerMenu(false)}
              to={"/"}
              className="text-white text-sm  p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              Home
            </Link>
            <Link
              onClick={() => setShowBurgerMenu(false)}
              to={"about"}
              className="text-white text-sm  p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              About
            </Link>
            <Link
              onClick={() => setShowBurgerMenu(false)}
              to={"contact"}
              className="text-white text-sm p-6 border-b-[3px] w-full flex justify-center hover:text-gray-200"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
