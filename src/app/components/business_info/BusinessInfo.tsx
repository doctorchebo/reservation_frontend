"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getBusinessById } from "@/app/store/business/businessActions";
import React, { useEffect } from "react";
import ImageList from "../image_list/ImageList";
import Location from "../location/Location";
import Typography from "../typography/Typography";
import styles from "./businessInfo.module.css";
interface BusinessInfoProps {
  businessId: number;
}
const BusinessInfo: React.FC<BusinessInfoProps> = ({ businessId }) => {
  const { business } = useAppSelector((state) => state.business);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBusinessById(businessId));
  }, [businessId]);

  return (
    business && (
      <div className={styles.container}>
        <Typography size="large">{business.name}</Typography>
        {business.images && <ImageList images={business.images} />}
        <Typography size="large">Direcciones</Typography>
        {business.addresses &&
          business.addresses.map((address) => {
            return <Location key={address.id} address={address} />;
          })}
      </div>
    )
  );
};

export default BusinessInfo;
