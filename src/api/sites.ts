/* eslint-disable @typescript-eslint/no-unused-vars */

import type { SitesQueryKey } from "../types/api";

// api.ts
export const fetchSites = async ({ queryKey }:{queryKey: SitesQueryKey}) => {
  const [_key, { path }] = queryKey;

  const res = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw {
      status: res.status,
      message: error?.message || res.statusText,
    };
  }
  return res.json();
};
