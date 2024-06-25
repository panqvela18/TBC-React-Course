"use client";
import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useI18n } from "@/locales/client";
import image1 from "/public/pexels-pixabay-262508.jpg";
import Blogs from "./Blogs";
import { PostData } from "@/app/interface";
import Image from "next/image";

interface BlogClientProps {
  postData: PostData[];
}

export default function BlogClient({ postData }: BlogClientProps) {
  const [search, setSearch] = useState("");
  const [visibleBlogs, setVisibleBlogs] = useState(4);

  const showMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 4);
  };
  const t = useI18n();

  let filteredBlogs = postData?.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="relative w-full h-screen">
        <Image
          src={image1}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="pt-20 flex justify-center items-center">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={postData}
          getOptionLabel={(option) => option.title}
          onChange={(_event, value) => {
            setSearch(value ? value.title : "");
          }}
          sx={{
            width: 300,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "inherit",
              },
              "&:hover fieldset": {
                borderColor: "inherit",
              },
              "&.Mui-focused fieldset": {
                borderColor: "inherit",
              },
            },
            "& .MuiInputBase-input": {
              color: "inherit",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "inherit",
              opacity: 1,
            },
            "& .MuiFormLabel-root": {
              color: "black",
            },
            "&.Mui-focused .MuiFormLabel-root": {
              color: "black",
            },
            "& .dark .MuiFormLabel-root": {
              color: "white",
            },
            "& .dark.Mui-focused .MuiFormLabel-root": {
              color: "white",
            },
          }}
          renderInput={(params) => (
            <TextField
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-gray-800 dark:text-white rounded-l-md"
              {...params}
              label={t("blog")}
            />
          )}
        />
      </div>
      <div className="grid grid-cols-4 px-[4%] justify-between gap-4 pb-5 pt-5 md:grid-cols-1">
        {filteredBlogs?.slice(0, visibleBlogs).map((blog) => (
          <Blogs key={blog.id} blogData={blog} />
        ))}
      </div>
      {visibleBlogs < filteredBlogs.length && (
        <div className="flex justify-center py-5">
          <button
            onClick={showMoreBlogs}
            className="px-4 py-2 bg-[#11545c] hover:bg-[#11545c] text-white rounded-md "
          >
            {t("seemore")}
          </button>
        </div>
      )}
    </>
  );
}
