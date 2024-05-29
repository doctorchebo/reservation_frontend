import { Address } from "@/app/types/addressType";
import React from "react";
import styles from "./location.module.css";

interface LocationProps {
  address: Address;
}
const Location: React.FC<LocationProps> = ({ address }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Dirección</div>
      <p className={styles.txt}>{address.name}</p>
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
