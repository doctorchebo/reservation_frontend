import { Schedule as ISchedule } from "@/app/types/scheduleType";
import React from "react";
import styles from "./schedule.module.css";
interface ScheduleProps {
  schedule: ISchedule;
}

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  const handleClick = ()=> {
    alert(`Reserva realizada! para: ${schedule.time}`)
  }
  return (
    <button className={styles.container} disabled={!schedule.isAvailable} onClick={handleClick}>
      {schedule.time.getHours().toString().padStart(2, "0")}:
      {schedule.time.getMinutes().toString().padStart(2, "0")}
    </button>
  );
};

export default Schedule;