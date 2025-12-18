import { useQuery } from "@tanstack/react-query";
import { fetchOverview } from "../api/overview";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useFootfall(siteId: string, fromUtc?: number, toUtc?: number) {
  return useQuery({
    queryKey: ["footfall", siteId,fromUtc,toUtc],
    queryFn: async () => {
      return fetchOverview({
        queryKey: [
          "footfall",
          {
            path: API_BASE_URL+"api/analytics/footfall",
            params: { siteId, fromUtc, toUtc },
          },
        ],
      });
    },
  });
}
