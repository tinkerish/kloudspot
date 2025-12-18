/* eslint-disable @typescript-eslint/no-unused-vars */

import type { EntriesQueryKey } from "../types/api";

// api.ts
export const fetchEntries = async ({
  queryKey,
}: {
  queryKey: EntriesQueryKey;
}) => {
  const [_key, { path, params }] = queryKey;

  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(params),
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
