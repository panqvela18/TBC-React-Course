"use client";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const updateUser = async () => {
      if (!blob || !user) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/upload-user-picture`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              blobUrl: blob.url,
              userSub: user.sub,
            }),
          }
        );

        if (!response.ok) {
          console.error("Failed to update user picture");
        } else {
          console.log("User picture updated successfully");
        }
      } catch (error) {
        console.error("Error updating user picture:", error);
      }
    };

    updateUser();
  }, [blob, user]);

  return (
    <>
      {/* <h1>Upload Your Avatar</h1> */}

      <form
        className="flex flex-col justify-center items-center gap-3"
        onSubmit={async (event) => {
          event.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];
          console.log(file.name);

          const response = await fetch(`/api/upload?filename=${file.name}`, {
            method: "POST",
            body: file,
          });

          const newBlob = (await response.json()) as PutBlobResult;

          setBlob(newBlob);
        }}
      >
        <input
          className="text-[10px]"
          name="file"
          ref={inputFileRef}
          type="file"
          required
        />
        <button
          className="bg-blue-500 w-32 text-white text-[12px] py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          type="submit"
        >
          Upload
        </button>
      </form>
      {blob && (
        <Image
          src={blob.url}
          priority={true}
          alt="Person-logo"
          className="h-auto rounded-[100%]"
          width={150}
          height={150}
        />
      )}
    </>
  );
}
