import { AUTH_COOKIE_KEY } from "@/constants";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete(AUTH_COOKIE_KEY);
    return Response.json({ message: "Success" });
  } catch (err) {
    console.error(err);
  }
}
