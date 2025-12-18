import { useQuery } from "@tanstack/react-query";
import { fetchOverview } from "../api/overview";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useDwell(siteId: string, fromUtc?: number, toUtc?: number) {
  return useQuery({
    queryKey: ["dwell", siteId, fromUtc, toUtc],
    queryFn: async () => {
      return fetchOverview({
        queryKey: [
          "dwell",
          {
            path: API_BASE_URL+"api/analytics/dwell",
            params: { siteId, fromUtc, toUtc },
          },
        ],
      });
    },
  });
}
