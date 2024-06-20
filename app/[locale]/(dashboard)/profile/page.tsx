import Title from "@/components/Title";
import UploadPage from "@/components/UploadPage";
// import { getSession } from "@auth0/nextjs-auth0";
import { getUserImage, getUserInfo } from "@/app/api";
import ProfileInfo from "@/components/ProfileInfo";
import Link from "next/link";
import { getI18n } from "@/locales/server";

export const metadata = {
  title: "Profile",
  description: "Profile by Next",
};

export default async function Profile() {
  // const session = await getSession();
  // const user = session?.user;
  const userImage = await getUserImage();
  const userInfo = await getUserInfo();
  const t = await getI18n();

  console.log(userInfo);

  return (
    <main className="bg-[#adb5bd] dark:bg-slate-900">
      <Title titleName={t("profile")} />
      <div className="px-[4%] pb-24 flex justify-center items-center md:flex-col gap-20 md:gap-12">
        <div className="flex flex-col gap-3 justify-center items-center">
          <UploadPage userImage={userImage} />
        </div>
        <div className="flex flex-col justify-center gap-8">
          <ProfileInfo user={userInfo} />
        </div>
      </div>
      <Link href={"profile/orders"}>{t("seeOrders")}</Link>
      <Link href={"profile/reviews"}>{t("seeReviews")}</Link>
    </main>
  );
}
