import { Schedule } from "../types/scheduleType";

export const scheduleComparator = (a: Schedule, b: Schedule) => {
    if (a.dayOfWeek < b.dayOfWeek) {
      return -1;
    }
    if (a.dayOfWeek > b.dayOfWeek) {
      return 1;
    }
    return 0;
  };