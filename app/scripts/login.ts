
export async function handleLogin(username:string, password:string) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  } catch (error) {
    console.error(error);
  }
}
