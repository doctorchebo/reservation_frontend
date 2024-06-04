"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllReservationsForCurrentUser } from "@/app/store/reservation/reservationActions";
import { useEffect } from "react";
import ReservationTable from "../reservation_table/ReservationTable";
import styles from "./reservationList.module.css";

const ReservationList = () => {
  const dispatch = useAppDispatch();
  const { reservations } = useAppSelector((state) => state.reservation);
  useEffect(() => {
    dispatch(getAllReservationsForCurrentUser());
  }, []);

  return (
    <div className={styles.container}>
      {reservations && <ReservationTable reservations={reservations} />}
    </div>
  );
};

export default ReservationList;
