"use client";
import { useAppDispatch } from "@/app/hooks/hooks";
import { deleteReservation } from "@/app/store/reservation/reservationActions";
import { ReservationDetailed } from "@/app/types/reservationType";
import dayjs from "dayjs";
import React, { useState } from "react";
import { MdModeEdit, MdOutlineDelete } from "react-icons/md";
import Dialog from "../dialog/Dialog";
import styles from "./reservationTable.module.css";
interface ReservationTableProps {
  reservations: ReservationDetailed[];
}
const ReservationTable: React.FC<ReservationTableProps> = ({
  reservations,
}) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [objectId, setObjectId] = useState<number | null | undefined>(null);
  const formatTime = (startTime: number) => {
    return `${dayjs(startTime).hour().toString().padStart(2, "0")}:${dayjs(
      startTime
    )
      .minute()
      .toString()
      .padStart(2, "0")}`;
  };
  const handleEdit = (reservationId: number) => {};

  const handleDelete = (reservationId: number | undefined) => {
    setObjectId(reservationId);
    setOpen(true);
  };

  const handleDeleteReservation = (reservationId: number | undefined) => {
    if (reservationId) {
      dispatch(deleteReservation(reservationId));
      setOpen(false);
    }
  };
  return (
    <div>
      <Dialog
        title="Eliminar Reserva"
        successBtnName="Eliminar"
        cancelBtnName="Cancelar"
        content={"Estas seguro de eliminar la reserva?"}
        handleCancel={() => setOpen(false)}
        handleSuccess={handleDeleteReservation}
        objectId={objectId}
        handleclose={() => setOpen(false)}
        open={open}
      />
      <table className={styles.tableContainer}>
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
              <tr key={reservation.id} className={styles.row}>
                <td>{dayjs(reservation.startTime).format("DD/MM/YYYY")}</td>
                <td>{formatTime(reservation.startTime)}</td>
                <td>{reservation.business.name}</td>
                <td>{reservation.service.name}</td>
                <td>
                  {reservation.member.firstName} {reservation.member.lastName}
                </td>
                <td>Activo</td>
                <td>
                  <div
                    className={styles.btnContainer}
                    onClick={() => handleEdit(reservation.id)}
                  >
                    <MdModeEdit color="rgb(96, 99, 143)" />
                  </div>
                </td>
                <td>
                  <div
                    className={styles.btnContainer}
                    onClick={() => handleDelete(reservation.id)}
                  >
                    <MdOutlineDelete color="rgb(96, 99, 143)" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
