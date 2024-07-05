import { useAppSelector } from "@/app/hooks/hooks";
import { Member } from "@/app/types/memberType";
import { Service } from "@/app/types/serviceType";
import { getHoursAndMinutes } from "@/app/utils/getHoursAndMinutes";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Button from "../button/Button";
interface DialogProps {
  open: boolean;
  handleBooking: () => void;
  handleClose: () => void;
  member: Member;
  service: Service;
}

const ReservationDialog: React.FC<DialogProps> = ({
  open,
  handleBooking,
  handleClose,
  service,
  member,
}) => {
  const { business: currentBusiness } = useAppSelector(
    (state) => state.business
  );
  const { schedule } = useAppSelector((state) => state.reservation);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmar reserva</DialogTitle>
      <DialogContent>
        {service && currentBusiness && schedule && member && (
          <>
            <DialogContentText>
              Se creará una reserva con los siguientes datos:
            </DialogContentText>
            <DialogContentText>
              <strong>Fecha:</strong> {schedule.format("DD/MM/YYYY")}
            </DialogContentText>
            <DialogContentText>
              <strong>Hora: </strong>
              {getHoursAndMinutes(schedule.valueOf())}
            </DialogContentText>
            <DialogContentText>
              <strong>Negocio:</strong> {currentBusiness.name}
            </DialogContentText>
            <DialogContentText>
              <strong>Servicio:</strong> {service.name}
            </DialogContentText>
            <DialogContentText>
              <strong>Miembro:</strong> {member.firstName} {member.lastName}
            </DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button children="Reservar" onClick={handleBooking} />
        <Button children="Cancelar" onClick={handleClose} />
      </DialogActions>
    </Dialog>
  );
};

export default ReservationDialog;
