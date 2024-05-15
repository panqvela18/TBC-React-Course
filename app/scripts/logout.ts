export const handleLogout = async () => {
   await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/logout`, {
    method: "POST",
  });
};
