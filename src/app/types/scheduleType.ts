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

export interface IScheduleCreateRequest {
  calendarId: number;
  dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  isWholeDay: boolean;
  startTime?: number;
  endTime?: number;
}
