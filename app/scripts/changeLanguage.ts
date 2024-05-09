"use server";
import { cookies } from "next/headers";

export async function changeLanguage() {
  const curr = cookies().get("Next-Locale");

  if (curr?.value === "en") {
    cookies().set("Next-Locale", "ka");
  } else {
    cookies().set("Next-Locale", "en");
  }
}