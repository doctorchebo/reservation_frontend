"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getBusinesses } from "@/app/store/business/businessActions";
import { useEffect } from "react";
import Business from "../business/Business";
import styles from "./businessList.module.css";
const BusinessList = () => {
  const { businesses } = useAppSelector((state) => state.business);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBusinesses());
  }, []);

  return (
    <div className={styles.container}>
      {businesses.map((business) => (
        <Business key={business.id} business={business} />
      ))}
    </div>
  );
};

export default BusinessList;
