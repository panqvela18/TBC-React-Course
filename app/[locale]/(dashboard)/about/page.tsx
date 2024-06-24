import React from "react";
import { teamDatas } from "@/Data/TeamData";
import TeamCard from "@/components/TeamCard";
import Title from "@/components/Title";
import { getI18n } from "@/locales/server";

export const metadata = {
  title: "About",
  description: "About by Next",
};

export default async function About() {
  const t = await getI18n();

  return (
    <main>
      <div
        className="relative w-full h-screen bg-no-repeat mb-[60px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://cdn.prod.website-files.com/5bc9fe82c6c2f54b071f0033/5f075d148a890b2cb7de16d7_32130662791_7ac1f87006_o_resized.webp)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white p-4 flex items-center justify-center w-1/2 sm:w-4/5 md:w-3/4">
            <h1 className="text-4xl font-bold sm:text-xl md:text-2xl">
              {t("longText")}
            </h1>
          </div>
        </div>
      </div>
      <div className="px-4 container pb-20">
        <Title titleName={t("Team")} />
        <div className="grid grid-cols-3 gap-8 justify-between px-[4%] md:grid-cols-2 sm:grid-cols-1">
          {teamDatas.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </main>
  );
}
