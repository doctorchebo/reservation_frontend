import ReservationList from "../components/reservation_list/ReservationList";
import styles from "./page.module.css";
const ReservationsPage = () => {
  return (
    <div className={styles.container}>
      <ReservationList />
    </div>
  );
};

export default ReservationsPage;
