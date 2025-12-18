import { useQuery } from "@tanstack/react-query";
import { fetchOverview } from "../api/overview";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useDemographics(
  siteId: string,
  fromUtc?: number,
  toUtc?: number
) {
  return useQuery({
    queryKey: ["demographics", siteId, fromUtc, toUtc],
    queryFn: async () => {
      return fetchOverview({
        queryKey: [
          "demographics",
          {
            path: API_BASE_URL+"api/analytics/demographics",
            params: { siteId, fromUtc, toUtc },
          },
        ],
      });
    },
  });
}
