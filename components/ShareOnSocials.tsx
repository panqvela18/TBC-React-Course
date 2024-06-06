"use client";
import React, { useEffect, useState } from "react";
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
        <>
          <TwitterShareButton
            url={`${process.env.NEXT_PUBLIC_VERCEL_URL}/product/${product.id}`}
            title={product.title}
          >
            <button>Share on Twitter</button>
          </TwitterShareButton>
          <FacebookShareButton
            url={`${process.env.NEXT_PUBLIC_VERCEL_URL}/product/${product.id}`}
            title={product.title}
          >
            <button>Share on Twitter</button>
          </FacebookShareButton>
          <LinkedinShareButton
            url={`${process.env.NEXT_PUBLIC_VERCEL_URL}/product/${product.id}`}
            title={product.title}
          >
            <button>Share on LinkedIn</button>
          </LinkedinShareButton>
        </>
      ) : (
        ""
      )}
    </>
  );
}
