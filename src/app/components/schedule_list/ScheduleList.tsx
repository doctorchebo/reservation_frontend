import { useAppSelector } from "@/app/hooks/hooks";
import { Duration } from "@/app/types/durationType";
import { Reservation } from "@/app/types/reservationType";
import { AvailableSchedule as ISchedule } from "@/app/types/scheduleType";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import Schedule from "../schedule/Schedule";
import styles from "./scheduleList.module.css";
interface ScheduleListProps {
  duration: Duration;
  reservations: Reservation[];
  date: Dayjs;
  handleSelect: (schedule: Date) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  duration,
  reservations,
  date,
  handleSelect,
}) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  const { memberId } = useAppSelector((state) => state.member);
  const { schedules: memberSchedules, loading } = useAppSelector(
    (state) => state.schedule
  );

  const getDaysOfWeek = () => {
    return memberSchedules.map((schedule) => {
      return schedule.dayOfWeek - 1;
    });
  };

  const isWholeDay = (dayOfWeek: number) => {
    const schedule = memberSchedules.find(
      (schedule) => schedule.dayOfWeek - 1 === dayOfWeek
    );
    if (schedule) {
      return schedule.isWholeDay;
    } else {
      return true;
    }
  };

  const getDayOfWeek = () => {
    return date.day();
  };

  const getDuration = () => {
    return (
      moment.duration(duration.duration).hours() +
      moment.duration(duration.duration).minutes() / 60
    );
  };

  const getDurationByTime = (time: number | Date): number => {
    return dayjs(time).hour() + dayjs(time).minute() / 60;
  };

  const getDifferenceDuration = (startTime: number) => {
    return (
      moment
        .duration(new Date().getTime() - dayjs(startTime).valueOf())
        .hours() +
      moment
        .duration(new Date().getTime() - dayjs(startTime).valueOf())
        .minutes() /
        60
    );
  };

  const getStartTime = () => {
    // get the day of week for which to evaluate
    const dayOfWeek = getDayOfWeek();
    const dayOfWeekHasStartTime =
      getDaysOfWeek().includes(dayOfWeek) && !isWholeDay(dayOfWeek);
    let startTime;
    if (dayOfWeekHasStartTime) {
      startTime = memberSchedules.filter(
        (sch) => sch.dayOfWeek - 1 == dayOfWeek
      )[0].startTime;
      // account for the case in which the current time is greater than the start time
      // if so, only show available schedules after the current time
      if (date.isSame(dayjs(new Date()), "day")) {
        const difference = Math.ceil(
          getDifferenceDuration(startTime) / getDuration()
        );
        return getDurationByTime(startTime) + getDuration() * difference;
      }
      return getDurationByTime(startTime);
    } else {
      return 0;
    }
  };

  const getEndTime = () => {
    let dayOfWeek = getDayOfWeek();
    const dayOfWeekHasEndTime =
      getDaysOfWeek().includes(dayOfWeek) && !isWholeDay(dayOfWeek);
    let endTime;
    if (dayOfWeekHasEndTime) {
      endTime = memberSchedules.filter(
        (sch) => sch.dayOfWeek - 1 == dayOfWeek
      )[0].endTime;
      return getDurationByTime(endTime);
    } else {
      return 24;
    }
  };

  const fitsOnEndTime = (date: Date) => {
    const time: number = getDurationByTime(date) + getDuration();
    return time <= getEndTime();
  };

  useEffect(() => {
    const createSchedules = () => {
      const startTimes = reservations.map((reservation) => {
        return getDurationByTime(reservation.startTime);
      });
      let schedules: ISchedule[] = [];
      let time = getStartTime();
      let isAvailable = true;
      while (time < getEndTime()) {
        if (startTimes.includes(time)) {
          isAvailable = false;
        } else {
          isAvailable = true;
        }
        let date = new Date();
        date.setHours(time);
        date.setMinutes(moment.duration(duration.duration).minutes());
        if (fitsOnEndTime(date)) {
          let schedule: ISchedule = {
            id: Math.random(),
            time: date,
            isAvailable: isAvailable,
          };
          schedules.push(schedule);
        }
        time += getDuration();
      }
      return schedules;
    };

    setSchedules(createSchedules());
  }, [reservations, duration, memberId]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Horarios Disponibles</div>
      {loading ? (
        <Loader />
      ) : (
        schedules.map((schedule) => {
          return (
            <Schedule
              key={schedule.id}
              schedule={schedule}
              handleSelect={handleSelect}
            />
          );
        })
      )}
    </div>
  );
};

export default ScheduleList;
