export const handleLogout = async () => {
  const res = await fetch("http://localhost:3000/api/logout", {
    method: "POST",
  });
};
