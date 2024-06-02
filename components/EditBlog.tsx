"use client";
import { updateBlog } from "@/app/actions";
import { PostData } from "@/app/interface";
import Modal from "@mui/material/Modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CiEdit } from "react-icons/ci";

interface BlogClientProps {
  blogData: PostData;
}

export default function EditBlog({ blogData }: BlogClientProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [blog, setBlog] = useState<PostData>(blogData);
  const router = useRouter();

  console.log(blog);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateBlog(blog);
      console.log("Blog updated successfully");
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
    router.refresh();
    handleClose();
  };

  const handleChange = (
    field: keyof PostData,
    value: string | number | null
  ) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      [field]: value,
    }));
  };

  return (
    <div>
      <CiEdit
        className="cursor-pointer mr-3"
        onClick={handleOpen}
        fontSize={30}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="title"
              value={blog.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              type="text"
              placeholder="description"
              value={blog.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image_url"
            >
              Image URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="image_url"
              type="text"
              placeholder="image_url"
              value={blog.image_url}
              onChange={(e) => handleChange("image_url", e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
