import Categories from "../categories/categories";
import styles from "./welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.container}>
      <p className={styles.txt}>Reserva ahora y evita esperas innecesarias</p>
      <Categories />
    </div>
  );
};

export default Welcome;
