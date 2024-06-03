import useAuth from "@/app/hooks/useAuth";
import { Schedule as ISchedule } from "@/app/types/scheduleType";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./schedule.module.css";
interface ScheduleProps {
  schedule: ISchedule;
  handleSelected: (schedule: Date)=> void;
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, handleSelected }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const handleClick = () => {
    if (isAuthenticated) {
      handleSelected(schedule.time);
    } else {
      router.push("/login");
    }
  };
  return (
    <button
      className={styles.container}
      disabled={!schedule.isAvailable}
      onClick={handleClick}
    >
      {schedule.time.getHours().toString().padStart(2, "0")}:
      {schedule.time.getMinutes().toString().padStart(2, "0")}
    </button>
  );
};

export default Schedule;
