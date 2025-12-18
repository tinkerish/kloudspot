export type Entries = {
  siteId: string;
  fromUtc: number;
  toUtc: number;
  pageSize: number;
  pageNumber: number;
  totalRecords: number;
  totalPages: number;
  records: EntryRecord[];
};
export type EntryRecord = {
  personId: string;
  personName: string;
  gender: string;
  zoneId: string;
  zoneName: string;
  severity: string;
  entryUtc: number;
  entryLocal: string;
  exitUtc: null;
  exitLocal: null;
  dwellMinutes: null;
};
