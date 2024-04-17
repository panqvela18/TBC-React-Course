import { AUTH_COOKIE_KEY } from "@/constants";
import { cookies } from "next/headers";

export async function login(username, password) {
  "use server";

  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const user = await res.json();

  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE_KEY, JSON.stringify(user));

  console.log(user);
}

export async function logOut() {
  "use server";
  const cookieStore = cookies();
  cookieStore.delete(AUTH_COOKIE_KEY);
}
