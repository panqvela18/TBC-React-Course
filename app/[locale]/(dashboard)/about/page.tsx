import React from "react";
import { teamDatas } from "@/Data/TeamData";
import TeamCard from "@/components/TeamCard";
import Title from "@/components/Title";

export const metadata = {
  title: "About",
  description: "About by Next",
};

export default function About() {
  return (
    <main>
      <div
        className="relative w-full h-screen bg-no-repeat mb-[60px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://cdn.prod.website-files.com/5bc9fe82c6c2f54b071f0033/5f075d148a890b2cb7de16d7_32130662791_7ac1f87006_o_resized.webp)`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white p-4 flex items-center justify-center w-1/2">
            <h1 className="text-4xl font-bold">
              Our leaders are service-driven industry experts, dedicated to
              providing our clients with everything they need to execute
              world-class productions and events. With their deep industry
              knowledge, they are helping NEP to lead the way in providing our
              clients with the best technical resources and the most advanced
              technology available in the industry.
            </h1>
          </div>
        </div>
      </div>
      <div className="px-4 container pb-20">
        <Title titleName="Tv Project Team" />
        <div className="grid grid-cols-3 gap-8 justify-between px-[4%] md:grid-cols-1">
          {teamDatas.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </main>
  );
}
