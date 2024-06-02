import { PostData } from "@/app/interface";
import Blogs from "./Blogs";

interface BlogClientProps {
  postData: PostData[];
  userId: number;
  userRole: string;
}

export default function BlogClient({
  postData,
  userId,
  userRole,
}: BlogClientProps) {
  return (
    <>
      {postData.map((blog) => {
        return (
          <Blogs
            key={blog.id}
            // id={blog.id}
            // title={blog.title}
            // description={blog.description}
            // user_id={blog.user_id}
            blogData={blog}
            userId={userId}
            userRole={userRole}
          />
        );
      })}
    </>
  );
}
