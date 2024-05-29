"use client";
import BusinessInfo from "@/app/components/business_info/BusinessInfo";
import ScheduleList from "@/app/components/schedule_list/ScheduleList";
import ServiceList from "@/app/components/service_list/ServiceList";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getDurations } from "@/app/store/duration/durationActions";
import { getReservationsByDate } from "@/app/store/reservation/reservationActions";
import { setDate } from "@/app/store/reservation/reservationSlice";
import CheckIcon from "@mui/icons-material/Check";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import {
  DatePicker,
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect } from "react";
import styles from "./page.module.css";
const BusinessPage = ({ params }: { params: { id: number } }) => {
  const businessId = params.id;
  const dispatch = useAppDispatch();
  const { serviceId } = useAppSelector((state) => state.service);
  const { duration } = useAppSelector((state) => state.duration);
  const { date, reservations } = useAppSelector((state) => state.reservation);
  useEffect(() => {
    if (serviceId && params.id) {
      dispatch(
        getReservationsByDate(serviceId, businessId, dayjs(date).startOf("day"))
      );

      dispatch(getDurations(serviceId, params.id));
    }
  }, [date, serviceId]);

  const handleSetDate = (
    value: dayjs.Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    dispatch(setDate(value!));
  };

  return (
    <div className={styles.container}>
      <div className={styles.businessContainer}>
        <BusinessInfo businessId={businessId} />
      </div>
      <div className={styles.dateContainer}>
        <ServiceList businessId={businessId} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
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
        </LocalizationProvider>
        {duration && reservations && (
          <ScheduleList duration={duration} reservations={reservations} />
        )}
      </div>
    </div>
  );
};

export default BusinessPage;
