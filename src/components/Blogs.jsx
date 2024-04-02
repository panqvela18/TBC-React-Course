import React from "react";

export default function Blogs({ id, img, title, description,date }) {
  return (
    <div className="flex flex-col bg-white filter drop-shadow-xl min-h-[400px] justify-between border border-[#e5e7eb] rounded">
      <div>
        <img className="rounded-tl rounded-tr" src={img} alt="blog" />
        <div className="px-4">
        <h5 className="mt-[5px] text-slate-400">{date}</h5>  
        <h3 className=" text-black text-xl font-bold mb-4">{title}</h3>
        <p className="text-medium_grey opacity-60 mb-4">{description}</p>

        </div>
      </div>
      <button className="bg-blue-500 p-4 text-white cursor-pointer">SEE MORE</button>
    </div>
  );
}
