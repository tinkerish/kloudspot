export type OverviewQueryKey = [
  string,
  {
    path: string;
    params: {
      siteId: string;
      fromUtc?: number;
      toUtc?: number;
    };
  }
];
export type SitesQueryKey = [
  string,
  {
    path: string;
  }
];
export type EntriesQueryKey = [
  string,
  {
    path: string;
    params: {
      siteId: string;
      fromUtc?: number;
      toUtc?: number;
      pageNumber: number;
      pageSize: number;
    };
  }
];
