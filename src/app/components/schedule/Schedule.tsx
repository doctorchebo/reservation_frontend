import React from "react";
import styles from "./schedule.module.css";
interface ScheduleProps {
  schedule: number;
}

const Schedule: React.FC<ScheduleProps> = ({ schedule }) => {
  return <div className={styles.container}>{schedule}</div>;
};

export default Schedule;
