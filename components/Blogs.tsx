"use client";
import Image from "next/image";
import defaulImage from "../public/Teamwork.png";
import Link from "next/link";
import { useI18n } from "@/locales/client";
import { deleteBlog } from "@/app/actions";
import { PostData } from "@/app/interface";
import EditBlog from "./EditBlog";
import { useUser } from "@auth0/nextjs-auth0/client";

interface BlogClientProps {
  blogData: PostData;
  userId: number;
  // userRole: string;
}
interface User {
  role: string[]; // Define role as an array of strings
  [key: string]: any; // To include other properties that might exist on the user object
}
export default function Blogs({ blogData, userId }: BlogClientProps) {
  const { user } = useUser() as unknown as { user: User }; // Type assertion
  const t = useI18n();
  const isAdmin = user?.role.includes("admin");
  const isOwner = userId === blogData.user_id;

  return (
    <div className="flex flex-col bg-white filter drop-shadow-xl min-h-[400px] justify-between border border-[#e5e7eb] rounded dark:bg-slate-900">
      <div>
        <Image className="rounded-tl rounded-tr" src={defaulImage} alt="blog" />
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
        {(isAdmin || isOwner) && (
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
