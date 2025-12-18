function isTokenExpired(token: string) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function isSessionValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  return !isTokenExpired(token);
}
