export async function login(email: string, password: string) {
  const res = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: email,
      password,
    }),
  })

  if (!res.ok) throw new Error("Invalid credentials")
  return res.json()
}
