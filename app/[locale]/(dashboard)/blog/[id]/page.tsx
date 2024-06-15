import { getBlogDetail, getPosts } from "@/app/api";
import { PostData } from "@/app/interface";
import Image from "next/image";

interface ProductsDetailsProps {
  params: {
    id: number;
    locale: string;
  };
}

export async function generateMetadata({ params }: ProductsDetailsProps) {
  const blogData = await getPosts();
  const blog = blogData.find((blog: PostData) => blog.id == params.id);

  return {
    title: `${blog.title}`,
    description: `${blog.description}`,
  };
}

export default async function BlogDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const blogDetail = await getBlogDetail(id);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="relative h-64 w-full mb-6">
        <Image
          src={blogDetail.image_url}
          alt={blogDetail?.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
        {blogDetail?.title}
      </h1>
      <p className="text-lg text-gray-600">{blogDetail.description}</p>
    </div>
  );
}
