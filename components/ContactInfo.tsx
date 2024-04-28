import React from "react";

interface ContactInfoProps {
  iconImage: React.ReactElement;
  info: string;
}

export default function ContactInfo({ iconImage, info }: ContactInfoProps) {
  return (
    <div className="flex items-center mb-5">
      {iconImage}
      <span className=" ml-4 text-2xl font-semibold text-black dark:text-white">
        {info}
      </span>
    </div>
  );
}
