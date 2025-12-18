export type DemographicsData={
    siteId: string;
    fromUtc: number;
    toUtc: number;
    timezone: string;
    buckets: DemoGraphicsBucketData[]
}

export type DemoGraphicsBucketData={
    utc: number;
    local: string;
    male: number;
    female: number
}