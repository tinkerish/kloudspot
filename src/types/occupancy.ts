export type OccupancyData={
    siteId: string;
    fromUtc: number;
    toUtc: number;
    timezone: string;
    buckets: BucketData[]
}

export type BucketData={
    utc: number;
    local: string;
    avg: number;
}