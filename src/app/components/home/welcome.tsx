"use client";
import Categories from "../categories/categories";
import Typography from "../typography/Typography";
import styles from "./welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.container}>
      <Typography size="large" color="dark">
        Reserva ahora y evita esperas innecesarias
      </Typography>
      <Categories />
    </div>
  );
};

export default Welcome;
