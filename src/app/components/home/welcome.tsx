"use client";
import useAuth from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";
import Categories from "../categories/categories";
import Toast from "../toast/Toast";
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
