import React from "react";

export default function Input({labelName,placeholder}) {
  return (
    <>
      <label className="text-blue-300 mb-2 text-lg font-semibold">
        {labelName}
      </label>
      <input
        className="border outline-none p-3 text-blue-300 rounded"
        type="text"
        required
        placeholder={placeholder}
      />
    </>
  );
}
