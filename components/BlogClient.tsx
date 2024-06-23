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
  const [visibleBlogs, setVisibleBlogs] = useState(4); // State to control number of visible blogs

  const t = useI18n();

  let filteredBlogs = postData?.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );

  const showMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 4); // Increment by 4
  };

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
                borderColor: "inherit", // Inherit border color
              },
              "&:hover fieldset": {
                borderColor: "inherit", // Inherit border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "inherit", // Inherit border color when focused
              },
            },
            "& .MuiInputBase-input": {
              color: "inherit", // Inherit text color
            },
            "& .MuiInputBase-input::placeholder": {
              color: "inherit", // Inherit placeholder color
              opacity: 1, // Ensures the placeholder is visible
            },
            "& .MuiFormLabel-root": {
              color: "black", // Black label color in light mode
            },
            "&.Mui-focused .MuiFormLabel-root": {
              color: "black", // Black label color when focused in light mode
            },
            "& .dark .MuiFormLabel-root": {
              color: "white", // White label color in dark mode
            },
            "& .dark.Mui-focused .MuiFormLabel-root": {
              color: "white", // White label color when focused in dark mode
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
