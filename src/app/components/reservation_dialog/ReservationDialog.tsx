import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getMemberById } from "@/app/store/member/memberActions";
import { getServiceById } from "@/app/store/service/serviceActions";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import Button from "../button/Button";
interface DialogProps {
  open: boolean;
  handleBooking: () => void;
  handleClose: () => void;
}

const ReservationDialog: React.FC<DialogProps> = ({
  open,
  handleBooking,
  handleClose,
}) => {
  const dispatch = useAppDispatch();
  const { serviceId, service } = useAppSelector((state) => state.service);
  const { memberId, member } = useAppSelector((state) => state.member);
  const { business: currentBusiness } = useAppSelector(
    (state) => state.business
  );
  const { schedule } = useAppSelector((state) => state.reservation);

  useEffect(() => {
    if (serviceId) {
      dispatch(getServiceById(serviceId));
    }
    if (memberId) {
      dispatch(getMemberById(memberId));
    }
  }, [serviceId, memberId]);

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
              <strong>Fecha:</strong> {dayjs(schedule).format("DD/MM/YYYY")}
            </DialogContentText>
            <DialogContentText>
              <strong>Hora:</strong>{" "}
              {dayjs(schedule).hour().toString().padStart(2, "0")}:
              {dayjs(schedule).minute().toString().padStart(2, "0")}
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
        <Button name="Reservar" onClick={handleBooking} />
        <Button name="Cancelar" onClick={handleClose} />
      </DialogActions>
    </Dialog>
  );
};

export default ReservationDialog;
