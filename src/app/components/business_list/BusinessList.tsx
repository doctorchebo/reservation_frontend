"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllBusinessesByCategoryId } from "@/app/store/business/businessActions";
import { setBusinesses, setSearched } from "@/app/store/business/businessSlice";
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
    dispatch(getAllBusinessesByCategoryId(categoryId));
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
