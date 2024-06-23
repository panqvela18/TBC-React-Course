"use client";
import type { PutBlobResult } from "@vercel/blob";
import { useState, useRef } from "react";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { useI18n } from "@/locales/client";

export default function AvatarUploadPage({ userImage }: { userImage: string }) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const { user } = useUser();
  const [loader, setLoader] = useState(false);
  const t = useI18n();

  useEffect(() => {
    setLoader(true);
    const updateUser = async () => {
      if (!blob || !user) return;
      try {
        setLoader(true);
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
          setLoader(false);
        }
      } catch (error) {
        console.error("Error updating user picture:", error);
      }
    };

    setLoader(false);

    updateUser();
  }, [blob, user]);

  return (
    <>
      <div className="relative rounded-full ">
        {loader && <p className="absolute top-0 left-0 ">{t("loading")}....</p>}
        {blob ? (
          <Image
            src={blob.url}
            priority={true}
            alt="Person-logo"
            className="h-auto "
            width={150}
            height={150}
          />
        ) : (
          <Image
            src={userImage}
            priority={true}
            alt="Person-logo"
            className="h-auto"
            width={150}
            height={150}
          />
        )}
        <div className="absolute right-1 bottom-1"></div>
        <input
          className="text-[10px] hidden"
          name="file"
          ref={inputFileRef}
          type="file"
          id="files"
          required
        />
        <label htmlFor="files" className="absolute right-0 bottom-0">
          <FaCamera fontSize={20} />
        </label>
      </div>
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
        <button
          className="bg-[#11545c] hover:bg-[#11545c] text-white text-[12px] py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          type="submit"
        >
          {t("upload")}
        </button>
      </form>
    </>
  );
}
