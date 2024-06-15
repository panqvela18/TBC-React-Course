"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HomeClient() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!showText && window.scrollY >= 1) {
        setShowText(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showText]);

  const buttonProps = {
    Initial: { opacity: 0.5, scale: 0.5 },
    whileInView: { opacity: 1, scale: 1 },
  };

  const testVideo =
    "https://vt4mrhsohjaaqsi5.public.blob.vercel-storage.com/background-42qk0lNGxfZiKxS76DAj0G0aeb8fyb.mp4";

  return (
    <main>
      <div className="w-full" style={{ height: "calc(100vh - 84px)" }}>
        <video src={testVideo} autoPlay muted loop />
        {showText && (
          <div className="absolute top-0 left-0 w-full h-full  text-white flex  items-center justify-center mix-blend-normal">
            <div className="flex flex-col justify-center items-center bg-[#11545c] bg-transparent  p-5">
              <motion.h1
                transition={{
                  ease: "easeInOut",
                  duration: 1,
                  delay: 0.2,
                }}
                viewport={{ once: true }}
                variants={buttonProps}
                whileInView={buttonProps.whileInView}
                initial={buttonProps.Initial}
                className="text-[150px] font-bold select-none font-montserrat"
              >
                TV PROJECT
              </motion.h1>
              <span
                className="text-[80px] font-bold text-white select-none font-body"
                style={{ display: "none" }}
              >
                PRODUCTION
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
