import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-500 py-10 px-6">
      <div className="container mx-auto flex justify-between items-baseline">
        <div className="flex items-center">
          <h1 className="text-white text-lg font-bold">Your Website</h1>
        </div>
        <nav className="flex items-center flex-col">
          <a href="/" className="text-white text-sm mb-4 hover:text-gray-200">
            Home
          </a>
          <a href="/" className="text-white text-sm mb-4 hover:text-gray-200">
            About
          </a>
          <a href="/" className="text-white text-sm hover:text-gray-200">
            Contact
          </a>
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
      </div>
    </footer>
  );
};

export default Footer;
