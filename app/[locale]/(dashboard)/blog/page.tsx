import BlogClient from "@/components/BlogClient";
import Title from "@/components/Title";
import React from "react";
import { getI18n } from "../../../../locales/server";
import { getPosts, getUserId } from "@/app/api";
import AddNewBlog from "@/components/AddNewBlog";

export const metadata = {
  title: "Blog",
  description: "Blog by Next",
};

export default async function Blog() {
  const postData = await getPosts();
  const t = await getI18n();
  const userId = await getUserId();
  // const userRole = await getUserRole();

  return (
    <main className="bg-white dark:bg-slate-900">
      <Title titleName={t("blogTitle")} />
      <AddNewBlog user_id={userId} />
      <BlogClient userId={userId} postData={postData} />
    </main>
  );
}
