import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchEntries } from "../api/entries";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useEntries(
  siteId: string,
  pageNumber: number,
  pageSize: number,
  fromUtc?: number,
  toUtc?: number
) {
  return useQuery({
    queryKey: ["crowdEntries", siteId, fromUtc, toUtc, pageNumber, pageSize],
    queryFn: async () =>
      fetchEntries({
        queryKey: [
          "crowdEntries",
          {
            path: API_BASE_URL + "api/analytics/entry-exit",
            params: { siteId, fromUtc, toUtc, pageNumber, pageSize },
          },
        ],
      }),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
