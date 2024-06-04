"use client";
import BusinessInfo from "@/app/components/business_info/BusinessInfo";
import MemberList from "@/app/components/member_list/MemberList";
import ReservationDialog from "@/app/components/reservation_dialog/ReservationDialog";
import ScheduleList from "@/app/components/schedule_list/ScheduleList";
import ServiceList from "@/app/components/service_list/ServiceList";
import Toast from "@/app/components/toast/Toast";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import useToast from "@/app/hooks/useToast";
import { getDurations } from "@/app/store/duration/durationActions";
import {
  createReservation,
  getReservationsByDate,
} from "@/app/store/reservation/reservationActions";
import {
  setDate,
  setReservation,
  setSchedule,
} from "@/app/store/reservation/reservationSlice";
import { ReservationRequest } from "@/app/types/reservationType";
import CheckIcon from "@mui/icons-material/Check";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import {
  DatePicker,
  DateValidationError,
  LocalizationProvider,
  PickerChangeHandlerContext,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import styles from "./page.module.css";

dayjs.extend(customParseFormat);

const BusinessPage = ({ params }: { params: { id: number } }) => {
  const [reservationName, setReservationName] = useState("Nueva Reserva");
  const businessId = params.id;
  const dispatch = useAppDispatch();
  const { serviceId } = useAppSelector((state) => state.service);
  const { duration } = useAppSelector((state) => state.duration);
  const { memberId } = useAppSelector((state) => state.member);
  const { date, reservations, reservation, schedule } = useAppSelector(
    (state) => state.reservation
  );
  const { user } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  useToast("Reserva creada!", "Éxito", 3000);

  useEffect(() => {
    if (reservation) {
      setOpen(false);
    }
    return () => {
      dispatch(setReservation(null));
    };
  }, [reservation]);

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

  const handleBooking = () => {
    if (serviceId && memberId && date && user) {
      const reservation: ReservationRequest = {
        name: reservationName,
        businessId: businessId,
        memberId: memberId,
        serviceId: serviceId,
        startTime: dayjs(schedule).set("millisecond", 0).set("second", 0),
        userId: user.id,
      };
      dispatch(createReservation(reservation));
    }
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleSelected = (schedule: Date) => {
    dispatch(setSchedule(schedule));
    setOpen(true);
  };

  const handleReservationNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReservationName(e.target.value);
  };

  const showScheduleList = duration && reservations && memberId && serviceId;
  return (
    <div className={styles.container}>
      <Toast />
      <div className={styles.businessContainer}>
        <BusinessInfo businessId={businessId} />
      </div>
      <div className={styles.dateContainer}>
        <ReservationDialog
          open={open}
          handleBooking={handleBooking}
          handleClose={handleCloseDialog}
        />
        <FormControl>
          <InputLabel>Nombre:</InputLabel>
          <OutlinedInput
            value={reservationName}
            onChange={handleReservationNameChange}
          />
        </FormControl>
        <ServiceList businessId={businessId} />
        <MemberList businessId={businessId} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            format="DD/MM/YYYY"
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
        {showScheduleList && (
          <ScheduleList
            duration={duration}
            reservations={reservations}
            handleSelected={handleSelected}
          />
        )}
      </div>
    </div>
  );
};

export default BusinessPage;
