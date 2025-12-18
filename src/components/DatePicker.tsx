import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type Props = {
  date: Date | null;
  handleDate: React.Dispatch<React.SetStateAction<Date | null>>;
};

const DatePickerComponent = ({ date, handleDate }: Props) => {
  return (
    <DatePicker
      disableFuture
      value={dayjs(date)}
      onChange={(value) => {
        handleDate((prev) => value?.toDate() || prev);
      }}
      slotProps={{
        textField: {
          size: "small",
        },
      }}
    />
  );
};

export default DatePickerComponent;
