export async function loginApi(payload: {
  email: string;
  password: string;
}) {
  const res = await fetch("https://hiring-dev.internal.kloudspot.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return res.json(); // { token, user }
}
