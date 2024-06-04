import { Reservation as IReservation } from "@/app/types/reservationType";
import styles from "./reservation.module.css";
interface ReservationProps {
  reservation: IReservation;
}

const Reservation: React.FC<ReservationProps> = ({ reservation }) => {
  return <div className={styles.container}>
  </div>;
};

export default Reservation;
