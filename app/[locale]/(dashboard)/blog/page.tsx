import BlogClient from "@/components/BlogClient";
import React from "react";
import { getPosts } from "@/app/api";
// import AddNewBlog from "@/components/AddNewBlog";
import { unstable_noStore as noStore } from "next/cache";

export const metadata = {
  title: "Blog",
  description: "Blog by Next",
};

export default async function Blog() {
  const postData = await getPosts();
  noStore();

  return (
    <main className="bg-[#adb5bd] dark:bg-slate-900">
      <BlogClient postData={postData} />
    </main>
  );
}
