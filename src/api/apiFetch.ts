import { triggerLogout } from "../lib/authService";

let alreadyLoggedOut = false;

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401 || (res.status === 403 && !alreadyLoggedOut)) {
    alreadyLoggedOut = true;
    triggerLogout();
  }

  return res;
}
