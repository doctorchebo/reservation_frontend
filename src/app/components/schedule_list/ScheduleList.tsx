import { Duration } from "@/app/types/durationType";
import { Reservation } from "@/app/types/reservationType";
import { AvailableSchedule as ISchedule } from "@/app/types/scheduleType";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Schedule from "../schedule/Schedule";
import styles from "./scheduleList.module.css";
interface ScheduleListProps {
  duration: Duration;
  reservations: Reservation[];
  handleSelected: (schedule: Date) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  duration,
  reservations,
  handleSelected,
}) => {
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
  useEffect(() => {
    const createSchedules = () => {
      const startTimes = reservations.map((reservation) => {
        return dayjs(reservation.startTime).hour();
      });
      let schedules: ISchedule[] = [];
      let h = 0;
      let isAvailable = true;
      while (h < 24) {
        if (startTimes.includes(Math.floor(h))) {
          isAvailable = false;
        } else {
          isAvailable = true;
        }
        let date = new Date();
        date.setHours(h);
        date.setMinutes(moment.duration(duration.duration).minutes());
        let schedule: ISchedule = {
          id: Math.random(),
          time: date,
          isAvailable: isAvailable,
        };
        schedules.push(schedule);
        h += moment.duration(duration.duration).hours();
        h += moment.duration(duration.duration).minutes() / 60;
      }
      return schedules;
    };

    setSchedules(createSchedules());
  }, [reservations, duration]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Horarios Disponibles</div>
      {schedules.map((schedule) => {
        return (
          <Schedule
            key={schedule.id}
            schedule={schedule}
            handleSelected={handleSelected}
          />
        );
      })}
    </div>
  );
};

export default ScheduleList;
