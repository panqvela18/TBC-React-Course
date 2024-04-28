import { PostData } from "@/app/interface";
import Blogs from "./Blogs";

interface BlogClientProps {
  postData: PostData[];
}

export default function BlogClient({ postData }: BlogClientProps) {
  return (
    <>
      {postData.map((blog) => {
        return (
          <Blogs
            key={blog.id}
            tags={blog.tags}
            id={blog.id}
            body={blog.body}
            title={blog.title}
          />
        );
      })}
    </>
  );
}
