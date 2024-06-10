import { getBlogDetail } from "@/app/api";
import Image from "next/image";

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
