import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

function formatHourToHH00(utc: number, timezoneStr: string) {
  const hours = dayjs(utc).tz(timezoneStr).hour();
  const formattedHours = hours.toString().padStart(2, "0");
  return `${formattedHours}:00`;
}
export default formatHourToHH00;
