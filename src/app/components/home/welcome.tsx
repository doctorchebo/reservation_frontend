"use client";
import useAuth from "@/app/hooks/useAuth";
import { useEffect, useState } from "react";
import Categories from "../categories/categories";
import Toast from "../toast/Toast";
import styles from "./welcome.module.css";

const Welcome = () => {
  const { isAuthenticated } = useAuth();
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (!isAuthenticated) {
      setShowToast(true);
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      {showToast && <Toast />}
      <p className={styles.txt}>Reserva ahora y evita esperas innecesarias</p>
      <Categories />
    </div>
  );
};

export default Welcome;
