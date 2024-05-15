// import { AUTH_COOKIE_KEY, TOKEN_COOKIE_KEY } from "@/constants";
import { AUTH_COOKIE_KEY } from "@/constants";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest) {
  const { username, password } = await request.json();

  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const user = await res.json();

  if (res.ok) {
    const cookieStore = cookies();
    cookieStore.set(AUTH_COOKIE_KEY, JSON.stringify(user));
    // cookieStore.set(TOKEN_COOKIE_KEY, JSON.stringify(user.token));
  }
  return Response.json({ username, password });
}
