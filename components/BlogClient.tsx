"use client";
import { PostData } from "@/app/interface";
import Blogs from "./Blogs";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

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
  const [search, setSearch] = useState("");
  let filteredProducts = postData.filter((prod) =>
    prod.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={postData}
        getOptionLabel={(option) => option.title}
        onChange={(_event, value) => {
          setSearch(value ? value.title : "");
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            onChange={(e) => setSearch(e.target.value)}
            {...params}
            label="Blogs"
          />
        )}
      />
      <div className="grid grid-cols-4 px-[4%] grid-rows-2 justify-between gap-4 pb-20 pt-5 md:grid-cols-1 ">
        {filteredProducts.map((blog) => {
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
      </div>
    </>
  );
}
