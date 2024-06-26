export interface Schedule {
  id: number;
  time: Date;
  isAvailable: boolean;
}

export interface ISchedule {
  id: number;
  calendarId: number;
  dayOfWeek: number;
  isWholeDay: boolean;
  startTime: number;
  endTime: number;
  created: number;
  modified: number;
}
