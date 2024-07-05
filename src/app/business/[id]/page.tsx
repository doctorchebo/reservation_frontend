"use client";
import BusinessInfo from "@/app/components/business_info/BusinessInfo";
import Loader from "@/app/components/loader/Loader";
import MemberList from "@/app/components/member_list/MemberList";
import ReservationDialog from "@/app/components/reservation_dialog/ReservationDialog";
import ScheduleList from "@/app/components/schedule_list/ScheduleList";
import ServiceList from "@/app/components/service_list/ServiceList";
import Toast from "@/app/components/toast/Toast";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import useToast from "@/app/hooks/useToast";
import { getBusinessById } from "@/app/store/business/businessActions";
import { getAllDurationsByServiceIdAndBusinessId } from "@/app/store/duration/durationActions";
import { getAllMembersByBusinessId } from "@/app/store/member/memberActions";
import {
  createReservation,
  getAllReservationsByMemberAndStartDate,
} from "@/app/store/reservation/reservationActions";
import {
  setDate,
  setReservation,
  setSchedule,
} from "@/app/store/reservation/reservationSlice";
import { getAllSchedulesByMemberId } from "@/app/store/schedule/scheduleActions";
import { getServicesByBusinessId } from "@/app/store/service/serviceActions";
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
import styles from "./page.module.css";

dayjs.extend(customParseFormat);

const BusinessPage = ({ params }: { params: { id: number } }) => {
  const [reservationName, setReservationName] = useState("Nueva Reserva");
  const businessId = params.id;
  const dispatch = useAppDispatch();
  const { business } = useAppSelector((state) => state.business);
  const { serviceId, services } = useAppSelector((state) => state.service);
  const { duration } = useAppSelector((state) => state.duration);
  const { memberId, members } = useAppSelector((state) => state.member);
  const { date, reservations, reservation, schedule } = useAppSelector(
    (state) => state.reservation
  );
  const { user } = useAppSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useToast("Reserva creada!", "Éxito", 3000);

  useEffect(() => {
    const fetchData = async () => {
      if (businessId) {
        await dispatch(getAllMembersByBusinessId(businessId));
        await dispatch(getBusinessById(businessId));
        await dispatch(getServicesByBusinessId(businessId));
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (reservation) {
      setOpen(false);
    }
    return () => {
      dispatch(setReservation(null));
    };
  }, [reservation]);

  useEffect(() => {
    if (memberId && serviceId && businessId) {
      dispatch(
        getAllReservationsByMemberAndStartDate(
          memberId,
          serviceId,
          businessId,
          dayjs(date).startOf("day")
        )
      );

      dispatch(getAllDurationsByServiceIdAndBusinessId(serviceId, businessId));
      dispatch(getAllSchedulesByMemberId(Number(memberId)));
    }
  }, [date, serviceId, memberId, businessId]);

  const handleChangeDate = (
    date: dayjs.Dayjs | null,
    context: PickerChangeHandlerContext<DateValidationError>
  ) => {
    date && dispatch(setDate(date));
  };

  const handleBooking = () => {
    if (serviceId && memberId && date && user && schedule) {
      const reservation: ReservationRequest = {
        name: reservationName,
        businessId: businessId,
        memberId: memberId,
        serviceId: serviceId,
        startTime: schedule,
        userId: user.id,
      };
      dispatch(createReservation(reservation));
    }
  };

  const handleSelectSchedule = (schedule: Date) => {
    const formattedDateTime = dayjs(date)
      .set("hour", dayjs(schedule).hour())
      .set("minute", dayjs(schedule).minute())
      .set("millisecond", 0)
      .set("second", 0);
    dispatch(setSchedule(formattedDateTime));
    setOpen(true);
  };

  const handleReservationNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReservationName(e.target.value);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    business && (
      <div className={styles.container}>
        <Toast />
        <div className={styles.businessContainer}>
          <BusinessInfo business={business} />
        </div>
        <div className={styles.dateContainer}>
          {date && (
            <ReservationDialog
              open={open}
              handleBooking={handleBooking}
              handleClose={() => setOpen(false)}
              member={
                members.filter((member) => member.id === Number(memberId))[0]
              }
              service={
                services.filter((service) => service.id === serviceId)[0]
              }
            />
          )}
          <FormControl>
            <InputLabel>Nombre:</InputLabel>
            <OutlinedInput
              value={reservationName}
              onChange={handleReservationNameChange}
            />
          </FormControl>
          <ServiceList services={services} />
          <MemberList members={members} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="DD/MM/YYYY"
              label="Fecha"
              slots={{
                openPickerIcon:
                  date == null || !date.isValid()
                    ? EditCalendarIcon
                    : CheckIcon,
              }}
              value={date}
              onChange={handleChangeDate}
              disablePast={true}
            />
          </LocalizationProvider>
          {duration && reservations && memberId && serviceId && date && (
            <ScheduleList
              date={date}
              duration={duration}
              reservations={reservations}
              handleSelect={handleSelectSchedule}
            />
          )}
        </div>
      </div>
    )
  );
};

export default BusinessPage;
