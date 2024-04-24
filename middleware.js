import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { AUTH_COOKIE_KEY } from "./constants";

export function middleware(request) {
  const cookieStore = cookies();

  const cookie = cookieStore.get(AUTH_COOKIE_KEY);
  const { pathname } = request.nextUrl;

  if (!cookie?.value && !pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (cookie?.value && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
