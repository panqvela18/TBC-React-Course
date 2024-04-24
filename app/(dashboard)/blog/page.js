import Api from "@/Data/Api";
import BlogClient from "@/components/BlogClient";
import Title from "@/components/Title";
import React from "react";

export const metadata = {
  title: "BLOG",
  description: "Blog by Next",
};

const fetchPosts = async () => {
  try {
    const response = await Api.get("posts");
    return response.data.posts;
  } catch (error) {
    console.log(error);
  }
};

export default async function Blog() {
  const postData = await fetchPosts();

  return (
    <main className="bg-white dark:bg-slate-900">
      <Title titleName="blogTitle" />
      <div className="grid grid-cols-4 px-[4%] grid-rows-2 justify-between gap-4 pb-20 pt-5 md:grid-cols-1 ">
        <BlogClient postData={postData} />
      </div>
    </main>
  );
}
