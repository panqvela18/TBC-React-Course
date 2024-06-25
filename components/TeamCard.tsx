import Image from "next/image";

export interface team {
  id: number;
  img: string;
  name: string;
  position: string;
}

const TeamCard = ({ member }: { member: any }) => {
  return (
    <div className="w-[300px] group relative cursor-pointer overflow-hidden rounded-lg shadow-lg">
      <Image
        src={member.img}
        width={300}
        height={300}
        alt={member.name}
        className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <h2 className="text-xl font-semibold text-white">{member.name}</h2>
        <p className="text-white">{member.position}</p>
      </div>
    </div>
  );
};

export default TeamCard;
