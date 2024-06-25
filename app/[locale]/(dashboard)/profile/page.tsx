import Title from "@/components/Title";
import UploadPage from "@/components/UploadPage";
// import { getSession } from "@auth0/nextjs-auth0";
import { getUserImage, getUserInfo } from "@/app/api";
import ProfileInfo from "@/components/ProfileInfo";
import { getI18n } from "@/locales/server";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";

export const metadata = {
  title: "Profile",
  description: "Profile by Next",
};

export default async function Profile() {
  const userImage = await getUserImage();
  const userInfo = await getUserInfo();
  const t = await getI18n();
  noStore();

  console.log(userInfo);

  return (
    <main className="bg-[#adb5bd] dark:bg-slate-900">
      <Title titleName={t("profile")} />
      <div className="px-[4%] pb-10 flex justify-center items-center md:flex-col gap-20 md:gap-12">
        <div className="flex flex-col gap-3 justify-center items-center">
          <UploadPage userImage={userImage} />
        </div>
        <div className="flex flex-col justify-center gap-8">
          <ProfileInfo user={userInfo} />
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center justify-center pb-20">
        <Link
          href={"profile/orders"}
          className="block  px-6 py-3 text-center text-sm w-40 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {t("myOrders")}
        </Link>
        <Link
          href={"profile/reviews"}
          className="block w-40 px-6 py-3 text-center text-sm text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300 dark:bg-green-500 dark:hover:bg-green-600"
        >
          {t("myReviews")}
        </Link>
      </div>
    </main>
  );
}
