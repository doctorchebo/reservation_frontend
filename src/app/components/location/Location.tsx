import { Address } from "@/app/types/addressType";
import React from "react";
import Typography from "../typography/Typography";
import styles from "./location.module.css";

interface LocationProps {
  address: Address;
}
const Location: React.FC<LocationProps> = ({ address }) => {
  return (
    <div className={styles.container}>
      <Typography size="medium">Dirección</Typography>
      <Typography size="small" color="dark">
        {address.name}
      </Typography>
      <iframe
        width="400"
        height="400"
        loading="lazy"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        &q=${address.geolocation.latitude},${address.geolocation.longitude}`}
      ></iframe>
    </div>
  );
};

export default Location;
