import { Business as IBusiness } from "@/app/types/businessType";
import Image from "next/image";
import React from "react";
import styles from "./business.module.css";
interface BusinessProps {
  business: IBusiness;
}
const Business: React.FC<BusinessProps> = ({ business }) => {
  const getMainAddress = () => {
    business.addresses.forEach((address) => {
      if (address.isMainAddress) {
        return address.name;
      }
    });
    return "";
  };
  return (
    <div className={styles.container}>
      {business.images?.length > 0 && (
        <div className={styles.imgContainer}>
          <Image
            width={230}
            height={230}
            src={business.images[0].url}
            alt="business_img"
            className={styles.img}
            priority={true}
          />
        </div>
      )}
      <div>{business.name}</div>
      {business.addresses.length > 0 && <div>{getMainAddress()}</div>}
    </div>
  );
};

export default Business;
