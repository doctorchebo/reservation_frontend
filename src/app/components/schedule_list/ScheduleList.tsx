import { Duration } from "@/app/types/durationType";
import { Reservation } from "@/app/types/reservationType";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import Schedule from "../schedule/Schedule";
import styles from "./scheduleList.module.css";
interface ScheduleListProps {
  duration: Duration;
  reservations: Reservation[];
}
const ScheduleList: React.FC<ScheduleListProps> = ({
  duration,
  reservations,
}) => {
  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    const createSchedules = () => {
      //let schedules = [];
      const items = duration.duration;
      //return schedules;
    };
  }, [duration, reservations]);
  console.log("duration: " + dayjs(duration.duration).get("hours"));

  return (
    <div className={styles.container}>
      {schedules.map((schedule) => {
        return <Schedule key={schedule} schedule={schedule} />;
      })}
    </div>
  );
};

export default ScheduleList;
