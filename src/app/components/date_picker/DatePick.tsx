"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAvailableBusinesses } from "@/app/store/business/businessActions";
import { setSearched } from "@/app/store/business/businessSlice";
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
  const dispatch = useAppDispatch();
  const { serviceId } = useAppSelector((state) => state.service);
  const [date, setDate] = useState<Dayjs | null>(
    dayjs(new Date()).startOf("day")
  );
  const [time, setTime] = useState<Dayjs | null>(dayjs("2024-04-17T17:00"));
  const handleSearch = () => {
    let hoursToAdd = dayjs(time).get("hour");
    let minutesToAdd = dayjs(time).get("minute");
    setTime(dayjs(date).add(hoursToAdd, "hour").add(minutesToAdd, "minute"));
    if (serviceId && time) {
      dispatch(getAvailableBusinesses(serviceId, time));
      dispatch(setSearched(true));
    }
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
            disablePast={true}
          />
          <TimePicker
            label="Hora"
            value={time}
            onChange={(newTime) => setTime(newTime)}
            minutesStep={60}
          />
        </div>
        <div>
          <Button
            name="Buscar"
            onClick={handleSearch}
            disabled={!date || !time || !serviceId}
          />
        </div>
      </LocalizationProvider>
    </div>
  );
};

export default DatePick;
