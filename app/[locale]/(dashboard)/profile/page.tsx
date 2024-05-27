import Title from "@/components/Title";
import UploadPage from "@/components/UploadPage";
import { getSession } from "@auth0/nextjs-auth0";
import { getUserImage } from "@/app/api";

export default async function Profile() {
  const session = await getSession();
  const user = session?.user;
  const userImage = await getUserImage();

  return (
    <main className="bg-white dark:bg-slate-900">
      <Title titleName="PROFILE" />
      <div className="px-[4%] pb-24 flex justify-center items-center md:flex-col gap-20 md:gap-12">
        <div className="flex flex-col gap-3 justify-center items-center">
          <UploadPage userImage={userImage} />
        </div>
        <div className="flex flex-col justify-center gap-8">
          <div className="flex border border-blue-500 p-4 xs:p-2 rounded-lg gap-8 xs:gap-3 shadow-lg bg-white items-baseline">
            <div className="flex flex-1 justify-center items-center"></div>
            <div className="font-bold text-blue-500">
              {user?.nickname && (
                <h3 className="text-xl  leading-6 h-8">Username</h3>
              )}
              {user?.family_name && (
                <h3 className="text-xl  leading-6 h-8">Name</h3>
              )}
              {user?.given_name && (
                <h3 className="text-xl  leading-6 h-8">Surname</h3>
              )}
              {user?.email && <h3 className="text-xl leading-6 h-8">Email</h3>}
            </div>
            <div className="text-gray-700">
              {user?.nickname && (
                <p className="text-lg leading-6 h-8">{user?.nickname}</p>
              )}
              {user?.given_name && (
                <p className="text-lg leading-6 h-8">{user.given_name}</p>
              )}
              {user?.family_name && (
                <p className="text-lg leading-6 h-8">{user.family_name}</p>
              )}
              {user?.email && (
                <p className="text-lg leading-6 h-8">{user.email}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
