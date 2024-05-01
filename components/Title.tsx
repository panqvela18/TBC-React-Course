"use client";

// Title component
export default function Title({ titleName }: { titleName: string }) {
  return (
    <div className="flex items-center justify-center py-10">
      <h1
        style={{
          fontSize: "clamp(1rem, 0.5385rem + 2.0513vw, 3rem)",
        }}
        className="inline-block border-b-2 pb-2 text-blue-500 font-bold dark:text-white"
      >
        {titleName}
      </h1>
    </div>
  );
}
