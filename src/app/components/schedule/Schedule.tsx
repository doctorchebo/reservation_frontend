import useAuth from "@/app/hooks/useAuth";
import { AvailableSchedule as ISchedule } from "@/app/types/scheduleType";
import { getHoursAndMinutes } from "@/app/utils/getHoursAndMinutes";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./schedule.module.css";
interface ScheduleProps {
  schedule: ISchedule;
  handleSelect: (schedule: Date) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, handleSelect }) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const handleClick = () => {
    if (isAuthenticated) {
      handleSelect(schedule.time);
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
      {getHoursAndMinutes(schedule.time)}
    </button>
  );
};

export default Schedule;
