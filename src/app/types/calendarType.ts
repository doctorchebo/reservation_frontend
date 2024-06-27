export interface Calendar {
  id: number;
  scheduleIds: number[];
  unavailableScheduleIds: number[];
  memberId: number;
  created: number;
  modified: number;
}
