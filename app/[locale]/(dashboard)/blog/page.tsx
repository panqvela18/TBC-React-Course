import BlogClient from "@/components/BlogClient";
import Title from "@/components/Title";
import React from "react";
import { getI18n } from "../../../../locales/server";
import { getPosts, getUserId, getUserRole } from "@/app/api";
import AddNewBlog from "@/components/AddNewBlog";

export const metadata = {
  title: "Blog",
  description: "Blog by Next",
};

export default async function Blog() {
  const postData = await getPosts();
  const t = await getI18n();
  const userId = await getUserId();
  const userRole = await getUserRole();

  return (
    <main className="bg-white dark:bg-slate-900">
      <Title titleName={t("blogTitle")} />
      <AddNewBlog user_id={userId} />
      <div className="grid grid-cols-4 px-[4%] grid-rows-2 justify-between gap-4 pb-20 pt-5 md:grid-cols-1 ">
        <BlogClient userRole={userRole} userId={userId} postData={postData} />
      </div>
    </main>
  );
}
