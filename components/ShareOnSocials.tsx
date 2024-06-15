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
            url={`https://tbc-react-course-nu.vercel.app/product/${product.id}`}
            title={product.title}
          >
            <button style={{ backgroundColor: "red" }}>Share on Twitter</button>
          </TwitterShareButton>
          <FacebookShareButton
            url={`https://tbc-react-course-nu.vercel.app/product/${product.id}`}
            title={product.title}
          >
            <button>Share on Facebook</button>
          </FacebookShareButton>
          <LinkedinShareButton
            url={`https://tbc-react-course-nu.vercel.app/product/${product.id}`}
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
