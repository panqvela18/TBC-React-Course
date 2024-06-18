"use client";
import React, { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

export default function ShareOnSocials({ product }: { product: any }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <div className="flex items-center justify-center mb-5">
          <TwitterShareButton
            url={`https://tbc-react-course-nu.vercel.app/product/${product.id}`}
            title={product.title}
          >
            <button className="bg-black w-[120px] h-[32px] flex items-center justify-center rounded-lg mr-2">
              <FaXTwitter fontSize={16} color="white" />
              <span className="text-[11px] ml-1 text-white">Tweet</span>
            </button>
          </TwitterShareButton>
          <FacebookShareButton
            url={`https://tbc-react-course-nu.vercel.app/product/${product.id}`}
            title={product.title}
          >
            <button className="bg-[#4267B2] w-[120px] h-[32px] flex items-center justify-center rounded-lg mr-2">
              <FaFacebookF fontSize={16} color="white" />
              <span className="text-[11px] ml-1 text-white">Share</span>
            </button>
          </FacebookShareButton>
          <LinkedinShareButton
            url={`https://tbc-react-course-nu.vercel.app/product/${product.id}`}
            title={product.title}
          >
            <button className="bg-[#2596be] w-[120px] h-[32px] flex items-center justify-center rounded-lg">
              <FaLinkedinIn fontSize={16} color="white" />
              <span className="text-[11px] ml-1 text-white">Share</span>
            </button>
          </LinkedinShareButton>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
