import { ReactElement } from "react";

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ka" }];
}

export default function BlogDetailLayout({
  children,
}: {
  children: ReactElement;
}) {
  return <>{children}</>;
}
