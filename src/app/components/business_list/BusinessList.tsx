"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setBusinesses, setSearched } from "@/app/store/business/businessSlice";
import { Business as IBusiness } from "@/app/types/businessType";
import { useEffect } from "react";
import Business from "../business/Business";
import Loader from "../loader/Loader";
import styles from "./businessList.module.css";

interface BusinessListProps {
  businesses: IBusiness[];
}
const BusinessList: React.FC<BusinessListProps> = ({ businesses }) => {
  const { loading, searched } = useAppSelector((state) => state.business);
  const dispatch = useAppDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearched(false));
      dispatch(setBusinesses([]));
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
