export type SiteData = {
  siteId: string;
  name: string;
  city: string;
  country: string;
  timezone: string;
  zone: ZoneData[]
};
export type ZoneData={
    zoneId: string;
    name: string;
    securityLevel:string;
}