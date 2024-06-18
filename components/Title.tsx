"use client";
import { motion } from "framer-motion";

export default function Title({ titleName }: { titleName: string }) {
  const divAnimate = {
    Initial: { scale: 0, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
  };

  return (
    <motion.div
      whileInView={divAnimate.whileInView}
      initial={divAnimate.Initial}
      viewport={{ once: true }}
      transition={{
        ease: "easeInOut",
        duration: 1,
        delay: 0.4,
      }}
      className="flex items-center justify-center py-10"
    >
      <h1
        style={{
          fontSize: "clamp(1rem, 0.5385rem + 2.0513vw, 3rem)",
        }}
        className="inline-block border-b-2 border-[#003049] pb-2 dark:text-white text-[#11545c] font-bold"
      >
        {titleName}
      </h1>
    </motion.div>
  );
}
