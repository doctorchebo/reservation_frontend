import ReservationList from "../components/reservation_list/ReservationList";
import Typography from "../components/typography/Typography";
import styles from "./page.module.css";
const ReservationsPage = () => {
  return (
    <div className={styles.container}>
      <Typography color="dark" size="large">
        Mis reservas
      </Typography>
      <ReservationList />
    </div>
  );
};

export default ReservationsPage;
