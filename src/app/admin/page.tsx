"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "../components/button/Button";
import Typografy from "../components/typography/Typography";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import useAuth from "../hooks/useAuth";
import { getBusinessesByUserId } from "../store/business/businessActions";
import styles from "./page.module.css";
const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { businesses } = useAppSelector((state) => state.business);
  const { user } = useAppSelector((state) => state.user);
  const [selected, setSelected] = useState<number | undefined>();
  useEffect(() => {
    if (businesses && user) {
      dispatch(getBusinessesByUserId(user.id));
    }
  }, [businesses, user]);
  if (!isAuthenticated) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.entityContainer}>
        <Typografy size="medium">Mis negocios</Typografy>
        {businesses.map((business) => {
          return (
            <Button
              key={business.id}
              name={business.name}
              onClick={() => setSelected(business.id)}
            />
          );
        })}
      </div>
      <div className={styles.listViewContainer}>
        {/* <BusinessAdminDetails businessId={selected} /> */}
      </div>
    </div>
  );
};

export default AdminPage;
