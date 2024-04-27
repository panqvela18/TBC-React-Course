import { AUTH_COOKIE_KEY, TOKEN_COOKIE_KEY } from "@/constants";
import { cookies } from "next/headers";

// export async function login(username, password) {
//   try {
//     ("use server");

//     const res = await fetch("https://dummyjson.com/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username,
//         password,
//       }),
//     });

//     const user = await res.json();

//     if (res.ok) {
//       const cookieStore = cookies();
//       cookieStore.set(AUTH_COOKIE_KEY, JSON.stringify(user));
//       cookieStore.set(TOKEN_COOKIE_KEY, JSON.stringify(user.token));
//     } else {
//       throw new Error("Failed to login");
//     }
//   } catch (error) {
//     console.error("Error occurred during login:", error);
//     // Handle error here, e.g., show an error message to the user
//   }
// }

// export async function logOut() {
//   try {
//     ("use server");
//     const cookieStore = cookies();
//     cookieStore.delete(AUTH_COOKIE_KEY);
//   } catch (error) {
//     console.error("Error occurred during logout:", error);
//   }
// }

export async function langToggle(lang) {
  "use server";
  const cookieStore = cookies();
  cookieStore.set("lang", lang);
}
