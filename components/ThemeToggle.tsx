"use client";
import { ThemeContext } from "@/app/providers/ThemeContext";
import { useContext } from "react";
import moon from "../public/moon.svg";
import sun from "../public/sun.svg";
import Image from "next/image";

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);

  function handleThemeChange() {
    setTheme(theme === "light" ? "dark" : "light");
  }
  return (
    <button onClick={handleThemeChange}>
      {theme === "dark" ? (
        <Image src={sun} alt="sun" width={30} height={30} />
      ) : (
        <Image src={moon} alt="moon" width={30} height={30} />
      )}
    </button>
  );
}
