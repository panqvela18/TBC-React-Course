export async function handleLogin(username:string, password:string) {
  try {
    await fetch("http://localhost:3000/api/login", {
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
