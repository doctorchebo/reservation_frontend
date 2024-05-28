"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setSearched } from "@/app/store/business/businessSlice";
import { useEffect } from "react";
import Business from "../business/Business";
import Loader from "../loader/Loader";
import styles from "./businessList.module.css";

interface BusinessListProps {
  categoryId: number;
}
const BusinessList: React.FC<BusinessListProps> = ({ categoryId }) => {
  const { businesses, loading, searched } = useAppSelector(
    (state) => state.business
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearched(false));
    };
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : businesses.length == 0 && searched ? (
        <div className={styles.txt}>
          Horario no disponible, por favor intenta con otra fecha/hora.
        </div>
      ) : (
        businesses.map((business) => (
          <Business key={business.id} business={business} />
        ))
      )}
    </div>
  );
};

export default BusinessList;
