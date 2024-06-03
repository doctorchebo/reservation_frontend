"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getBusinessById } from "@/app/store/business/businessActions";
import React, { useEffect } from "react";
import ImageList from "../image_list/ImageList";
import Location from "../location/Location";
import styles from "./businessInfo.module.css";
interface BusinessInfoProps {
  businessId: number;
}
const BusinessInfo: React.FC<BusinessInfoProps> = ({ businessId }) => {
  const { business: currentBusiness } = useAppSelector(
    (state) => state.business
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBusinessById(businessId));
  }, [businessId]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{currentBusiness?.name}</div>
      {currentBusiness?.images && (
        <ImageList images={currentBusiness?.images} />
      )}
      {currentBusiness?.addresses && (
        <Location address={currentBusiness.addresses[0]} />
      )}
    </div>
  );
};

export default BusinessInfo;
