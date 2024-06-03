"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllReservationsForCurrentUser } from "@/app/store/reservation/reservationActions";
import { useEffect } from "react";

const ReservationList = () => {
  const dispatch = useAppDispatch();
  const { reservations } = useAppSelector((state) => state.reservation);
  useEffect(() => {
    dispatch(getAllReservationsForCurrentUser());
  }, []);

  return <div>{JSON.stringify(reservations, null, 2)}</div>;
};

export default ReservationList;
