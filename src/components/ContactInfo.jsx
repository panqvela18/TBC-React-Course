import React from "react";

export default function ContactInfo({ iconImage, info }) {
  return (
    <div className="flex items-center mb-5">
      {iconImage}
      <span className=" ml-4 text-2xl font-semibold">{info}</span>
    </div>
  );
}
