"use client";
import { Business } from "@/app/types/businessType";
import React from "react";
import ImageList from "../image_list/ImageList";
import Location from "../location/Location";
import Typography from "../typography/Typography";
import styles from "./businessInfo.module.css";
interface BusinessInfoProps {
  business: Business;
}
const BusinessInfo: React.FC<BusinessInfoProps> = ({ business }) => {
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
