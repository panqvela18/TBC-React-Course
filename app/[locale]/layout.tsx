import { Inter } from "next/font/google";
import "./globals.css";
import { ReactElement } from "react";
import { ThemeProvider } from "../providers/ThemeContext";
import { I18nProviderClient } from "@/locales/client";
import { UserProvider } from "@auth0/nextjs-auth0/client";
// import { CartProvider } from "../providers/CartContext";
// import { LangProvider } from "./providers/LangContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TBC x USAID",
  description: "Generated by create next app",
};

export default async function RootLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactElement;
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen justify-between">
          {/* <CartProvider> */}

          <I18nProviderClient locale={locale}>
            <ThemeProvider>
              {" "}
              <UserProvider>{children} </UserProvider>
            </ThemeProvider>
          </I18nProviderClient>

          {/* </CartProvider> */}
        </div>
      </body>
    </html>
  );
}
