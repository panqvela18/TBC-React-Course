import React from "react";

export default function Blog({ id, img, title, description }) {
  return (
    <div className="flex flex-col min-h-[400px] justify-between border border-[#e5e7eb] rounded">
      <div>
        <img className="rounded-tl rounded-tr" src={img} alt="blog" />
        <div className="px-4">
        <h3 className=" text-black text-xl font-bold my-4">{title}</h3>
        <p className="text-medium_grey opacity-60 mb-4">{description}</p>

        </div>
      </div>
      <button className="bg-blue-500 p-4 text-white cursor-pointer">SEE MORE</button>
    </div>
  );
}
