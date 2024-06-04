import { Reservation } from "@/app/types/reservationType";
import dayjs from "dayjs";
import React from "react";
import styles from "./reservationTable.module.css";
interface ReservationTableProps {
  reservations: Reservation[];
}
const ReservationTable: React.FC<ReservationTableProps> = ({
  reservations,
}) => {
  const formatTime = (startTime: number) => {
    return `${dayjs(startTime).hour().toString().padStart(2, "0")}:${dayjs(
      startTime
    )
      .minute()
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <table className={styles.container}>
      <thead>
        <tr className={styles.headerRow}>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Negocio</th>
          <th>Servicio</th>
          <th>Miembro</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {reservations.map((reservation) => {
          return (
            <tr className={styles.row}>
              <td>{dayjs(reservation.startTime).format("DD/MM/YYYY")}</td>
              <td>{formatTime(reservation.startTime)}</td>
              <td>{reservation.businessId}</td>
              <td>{reservation.serviceId}</td>
              <td>{reservation.memberId}</td>
              <td>Activo</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReservationTable;
