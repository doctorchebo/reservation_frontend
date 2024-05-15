import React from "react";
import styles from "./welcome.module.css";
import Categories from "../categories/categories";

const Welcome = () => {
  return (
    <div className={styles.container}>
      <p className={styles.txt}>Make a reservation</p>
      <Categories/>
    </div>
  );
};

export default Welcome;
