"use client";
import ScheduleList from "@/app/components/schedule_list/ScheduleList";
import ServiceList from "@/app/components/service_list/ServiceList";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getDurations } from "@/app/store/duration/durationActions";
import { getReservationsByDate } from "@/app/store/reservation/reservationActions";
import CheckIcon from "@mui/icons-material/Check";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
const BusinessPage = ({ params }: { params: { id: number } }) => {
  const businessId = params.id;
  const dispatch = useAppDispatch();
  const [date, setDate] = useState<Dayjs | null>(null);
  const { serviceId } = useAppSelector((state) => state.service);
  const { duration } = useAppSelector((state) => state.duration);
  const { reservations } = useAppSelector((state) => state.reservation);
  useEffect(() => {
    if (serviceId && params.id) {
      dispatch(
        getReservationsByDate(serviceId, businessId, dayjs(date).startOf("day"))
      );

      dispatch(getDurations(serviceId, params.id));
    }
  }, [date]);

  return (
    <div className={styles.container}>
      <div className={styles.businessContainer}>Business Content</div>
      <div className={styles.dateContainer}>
        <ServiceList businessId={businessId} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className={styles.elementContainer}>
            <DatePicker
              label="Fecha"
              slots={{
                openPickerIcon:
                  date == null || !date.isValid()
                    ? EditCalendarIcon
                    : CheckIcon,
              }}
              value={date}
              onChange={setDate}
              disablePast={true}
            />
            {duration && reservations && (
              <ScheduleList duration={duration} reservations={reservations} />
            )}
            <div>{JSON.stringify(duration, null, 2)}</div>
            <div>{JSON.stringify(reservations, null, 2)}</div>
          </div>
        </LocalizationProvider>
      </div>
    </div>
  );
};

export default BusinessPage;
