export interface AvailableSchedule {
  id: number;
  time: Date;
  isAvailable: boolean;
}

export interface Schedule {
  id: number;
  calendarId: number;
  dayOfWeek: number;
  isWholeDay: boolean;
  startTime: number;
  endTime: number;
  created: number;
  modified: number;
}

export interface ScheduleRequest {
  scheduleId: number;
}
export interface ScheduleCreateRequest {
  calendarId: number;
  dayOfWeek: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  isWholeDay: boolean;
  startTime?: number;
  endTime?: number;
}

export interface SchedulePatchDayOfWeekRequest extends ScheduleRequest {
  dayOfWeek: number;
}
export interface SchedulePatchIsWholeDay extends ScheduleRequest {
  isWholeDay: boolean;
}
export interface SchedulePatchStartTime extends ScheduleRequest {
  startTime: number;
}
export interface SchedulePatchEndTime extends ScheduleRequest {
  endTime: number;
}
