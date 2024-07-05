import dayjs from "dayjs";

export const getHoursAndMinutes = (time: Date | number) => {
  return `${dayjs(time).hour().toString().padStart(2, "0")}:${dayjs(time)
    .minute()
    .toString()
    .padStart(2, "0")}`;
};
