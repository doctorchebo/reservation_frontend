import { ISchedule } from "./scheduleType";

export interface Calendar {
  id: number;
  schedules: ISchedule[];
  unavailableDates: ISchedule[];
  memberId: number;
  created: number;
  modified: number;
}
