import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function getEndOfDayUtc(
  date: Date,
  siteTimezone: string
): number {
  const selected = dayjs(date).tz(siteTimezone);
  const today = dayjs().tz(siteTimezone);
  if (selected.isSame(today, "day")) {
    return today.utc().valueOf();
  }

  return selected.endOf("day").utc().valueOf();
}

export function getStartOfDayUtc(
  date: Date,
  siteTimezone: string
): number {
  return dayjs(date)
    .tz(siteTimezone)
    .startOf("day")
    .utc()
    .valueOf();
}
export function getPreviousDay(date: Date,siteTimezone: string): Date {
  return dayjs(date).tz(siteTimezone).subtract(1, "day").toDate();
}
export function formatMinutes(value: number) {
  let min = Math.floor(value);
  let sec = Math.round((value - min) * 60);

  if (sec === 60) {
    min += 1;
    sec = 0;
  }

  return `${min}m ${sec}s`;
}
