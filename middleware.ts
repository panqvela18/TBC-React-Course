import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "next-international/middleware";

export default async function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const appSessionCookie = cookieStore.get("appSession");
  const { pathname } = request.nextUrl;
  if (
    !appSessionCookie &&
    (pathname.startsWith("/profile") || pathname.startsWith("/admin"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (appSessionCookie && pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const I18nMiddleware = createI18nMiddleware({
    locales: ["en", "ka"],
    defaultLocale: "en",
    urlMappingStrategy: "rewrite",
  });

  const response = await I18nMiddleware(request);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|static|.*\\..*|favicon.ico|robots.txt).*)"],
};
