"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import useAuth from "@/app/hooks/useAuth";
import { getAllReservationsForCurrentUser } from "@/app/store/reservation/reservationActions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "../button/Button";
import Loader from "../loader/Loader";
import ReservationTable from "../reservation_table/ReservationTable";
import Typography from "../typography/Typography";
import styles from "./reservationList.module.css";

const ReservationList = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const { reservationsDetailed, loading } = useAppSelector(
    (state) => state.reservation
  );
  useEffect(() => {
    dispatch(getAllReservationsForCurrentUser());
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        reservationsDetailed.length == 0 && (
          <div>
            <Typography color="dark" size="small">
              No tienes reservas
            </Typography>
            <Button onClick={() => router.push("/")}>Hacer una reserva</Button>
          </div>
        )
      )}
      {reservationsDetailed.length > 0 && isAuthenticated && (
        <ReservationTable reservations={reservationsDetailed} />
      )}
    </div>
  );
};

export default ReservationList;
