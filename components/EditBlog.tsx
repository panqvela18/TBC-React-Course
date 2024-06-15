"use client";
import { useState, useRef } from "react";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { updateBlog } from "@/app/actions";
import { PostData } from "@/app/interface";
import { CiEdit } from "react-icons/ci";

interface BlogClientProps {
  blogData: PostData;
}

export default function EditBlog({ blogData }: BlogClientProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [blog, setBlog] = useState<PostData>(blogData);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      throw new Error("No file selected");
    }

    const file = e.target.files[0];

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = await response.json();
      setBlog((prevBlog) => ({
        ...prevBlog,
        image_url: newBlob.url,
      }));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
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
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-2xl max-h-full overflow-y-auto">
          <form onSubmit={handleSubmit} className="w-full">
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
                placeholder="Title"
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
                placeholder="Description"
                value={blog.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Image
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="file"
                ref={inputFileRef}
                onChange={handleFileChange}
              />
            </div>
            {blog.image_url && (
              <div className="mb-4">
                <Image
                  src={blog.image_url}
                  alt="Blog Image"
                  className="max-w-full h-auto"
                  width={100}
                  height={100}
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
