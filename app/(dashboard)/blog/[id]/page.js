import Image from "next/image";
import defaulImage from "../../../../public/Teamwork.png";
import { AiFillLike } from "react-icons/ai";

export async function generateStaticParams() {
  try {
    const res = await fetch("https://dummyjson.com/posts");
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await res.json();
    console.log(posts);

    const paths = posts.posts.map((post) => ({
      params: { id: `blog/${post.id}` },
    }));

    return paths;
  } catch (error) {
    console.error("Error fetching or processing posts:", error);
    return [];
  }
}

async function fetchBlog(id) {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  const post = await res.json();

  return post;
}
export default async function BlogDetail({ params }) {
  const { id } = params;
  const post = await fetchBlog(id);

  return (
    <main className="px-[4%] bg-white dark:bg-slate-900">
      <section className="flex flex-col justify-center items-center">
        <div className="flex items-center my-6">
          <h1 className="text-center text-gray-500 font-bold text-2xl underline mr-5 dark:text-white">
            {post.title}
          </h1>
          <div className="flex items-center">
            <AiFillLike
              className="text-gray-200 dark:white"
              // color="gray"
              fontSize={25}
            />
            <span>{post.reactions}</span>
          </div>
        </div>
        <Image
          className="w-screen object-cover h-96 rounded"
          src={defaulImage}
          alt="postImage"
          width={500}
          height={500}
        />
        <div className="flex flex-wrap items-center mt-5">
          {post.tags.map((tag, index) => {
            return (
              <button
                key={index}
                className="p-2 rounded-lg bg-slate-300 text-white mr-2 dark:bg-white dark:text-black w-40"
              >
                {tag}
              </button>
            );
          })}
        </div>
        <div className="column-container my-6">
          <p className="column-2 gap-x-8 text-lg text-gray-400 dark:text-white">
            {post.body}
          </p>
        </div>
      </section>
    </main>
    // <h1>{post.title}</h1>
  );
}
