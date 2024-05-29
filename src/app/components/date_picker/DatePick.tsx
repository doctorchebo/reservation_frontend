"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAvailableBusinesses } from "@/app/store/business/businessActions";
import { setSearched } from "@/app/store/business/businessSlice";
import { setDate } from "@/app/store/reservation/reservationSlice";
import CheckIcon from "@mui/icons-material/Check";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import {
  DatePicker,
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
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
  const { date } = useAppSelector((state) => state.reservation);
  const [time, setTime] = useState<Dayjs | null>(
    dayjs(`${new Date().toISOString().split("T")[0]}T17:00`)
  );
  const handleSearch = () => {
    let hoursToAdd = dayjs(time).get("hour");
    let minutesToAdd = dayjs(time).get("minute");
    setTime(dayjs(date).add(hoursToAdd, "hour").add(minutesToAdd, "minute"));
    if (serviceId && time) {
      dispatch(getAvailableBusinesses(serviceId, time));
      dispatch(setSearched(true));
    }
  };

  const handleSetDate = (
    value: dayjs.Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    dispatch(setDate(value!));
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
            onChange={handleSetDate}
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
