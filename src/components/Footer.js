import React from "react";
import logo from "../images/icons8-logo.svg";

const Footer = () => {
  return (
    <footer className="flex justify-between items-start  bg-blue-500 pt-10 px-[4%] md:flex-col md:items-center">
      <div className="flex items-center">
        <img className="md:mb-4" src={logo} alt="logo" />
      </div>
      <nav className="flex items-center flex-col md:mb-4">
        <a href="/" className="text-white text-sm mb-4 hover:text-gray-200">
          Terms and Conditions
        </a>
        <a href="/" className="text-white text-sm mb-4 hover:text-gray-200">
          About
        </a>
        <a href="/" className="text-white text-sm mb-4 hover:text-gray-200">
          Contact
        </a>
        <a href="/" className="text-white text-sm hover:text-gray-200">
          Privacy policy
        </a>
        <p className="text-white text-sm mb-4 mt-10 md:hidden">
          © 2024.All rights reserved.
        </p>
      </nav>
      <div className="flex items-center">
        <input
          type="email"
          className="min-h-12 max-w-48 px-4 text-white text-base border border-white rounded-l bg-transparent focus:outline-none"
          id="Email"
          name="Email"
          placeholder="example@gmail.com"
        />
        <input
          className="min-h-12 px-4 border-none rounded-r bg-white text-black-500 text-base cursor-pointer transition-colors duration-300 hover:bg-transparent hover:border-spacing-1 hover:text-slate-200"
          value="Subscribe"
          type="submit"
        />
      </div>
      <p className="hidden text-white text-sm mb-4 mt-10 md:block">
        © 2024.All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
