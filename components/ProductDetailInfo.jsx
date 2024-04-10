import React from "react";

export default function ProductDetailInfo({info,detail}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <span className="text-gray-800 text-lg">{info}</span>
      <div className="flex items-center text-gray-400 text-xl">{detail}</div>
    </div>
  );
}
