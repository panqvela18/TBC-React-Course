import React from "react";
import logo from "../images/icons8-logo.svg";

const Header = () => {
  return (
    <header className="bg-blue-500 py-4 px-[4%]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" />
          {/* <h1 className="text-white text-lg font-bold">Your Website</h1> */}
        </div>
        <nav className="flex items-center">
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
      </div>
    </header>
  );
};

export default Header;
