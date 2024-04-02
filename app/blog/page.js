import { blogData } from "@/Data/BlogData";
import Blogs from "@/components/Blogs";
import Title from "@/components/Title";
import React from "react";

export default function Page() {
  return (
    <main className="bg-[aliceblue]">
      <Title titleName="BLOGS" />
      <div className="grid grid-cols-4 px-[4%] grid-rows-2 justify-between gap-4 pb-20 pt-5 md:grid-cols-1 ">
        {blogData.map((blog) => {
          return (
            <Blogs
              key={blog.id}
              img={blog.img}
              description={blog.description}
              title={blog.title}
              date={blog.date}
            />
          );
        })}
      </div>
    </main>
  );
}
