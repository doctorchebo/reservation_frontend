"use client";
import CheckIcon from "@mui/icons-material/Check";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import Button from "../button/Button";
import styles from "./datePick.module.css";

const DatePick = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  console.log(date);
  const handleSearch = () => {
    console.log("Searching...");
  };
  return (
    <div className={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className={styles.elementContainer}>
          <DatePicker
            label="Fecha"
            slots={{
              openPickerIcon:
                date == null || !date.isValid() ? EditCalendarIcon : CheckIcon,
            }}
            value={date}
            onChange={setDate}
          />
          <TimePicker label="Hora" defaultValue={dayjs("2024-04-17T17:00")} />
        </div>
        <div>
          <Button name="Buscar" onClick={handleSearch} />
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default DatePick;
