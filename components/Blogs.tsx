"use client";
import Image from "next/image";
// import defaulImage from "../public/Teamwork.png";
import Link from "next/link";
import { useI18n } from "@/locales/client";
import { deleteBlog } from "@/app/actions";
import { PostData } from "@/app/interface";
import EditBlog from "./EditBlog";
import { useUser } from "@auth0/nextjs-auth0/client";

interface BlogClientProps {
  blogData: PostData;
}
interface User {
  role: string[];
  [key: string]: any;
}
export default function Blogs({ blogData }: BlogClientProps) {
  const { user } = useUser() as unknown as { user: User };
  const t = useI18n();
  const isAdmin = user?.role.includes("admin");

  return (
    <div className="flex flex-col bg-white filter drop-shadow-xl min-h-[400px] justify-between border border-[#e5e7eb] rounded dark:bg-slate-900">
      <div>
        <Image
          className="rounded-tl rounded-tr w-full"
          src={blogData.image_url}
          alt="blog"
          width={100}
          height={100}
        />
        <div className="px-4">
          <h3 className=" text-black text-xl font-bold mb-4 dark:text-slate-200">
            {blogData.title}
          </h3>
          <p className="text-medium_grey opacity-60 mb-4 dark:text-white">{`${blogData.description
            .split(" ")
            .slice(0, 30)
            .join(" ")} ...`}</p>
        </div>
      </div>
      <div className="flex flex-col items-center">
        {isAdmin && (
          <>
            <button onClick={() => deleteBlog(blogData.id)}>Delete</button>
            <EditBlog blogData={blogData} />
          </>
        )}
        <Link
          className="bg-blue-500 p-4 text-white cursor-pointer w-full dark:bg-white dark:text-black text-center"
          href={`/blog/${blogData.id}`}
        >
          {t("seeMore")}
        </Link>
      </div>
    </div>
  );
}
