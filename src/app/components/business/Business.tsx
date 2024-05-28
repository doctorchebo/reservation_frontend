"use client";
import { Business as IBusiness } from "@/app/types/businessType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./business.module.css";
interface BusinessProps {
  business: IBusiness;
}
const Business: React.FC<BusinessProps> = ({ business }) => {
  const router = useRouter();
  const [mainAddress, setMainAddress] = useState("");
  useEffect(() => {
    const getMainAddress = () => {
      let name = "";
      business.addresses.forEach((address) => {
        if (address.isMainAddress) {
          name = address.name;
        } else {
          return;
        }
      });
      return name;
    };
    if (business.addresses.length > 0) {
      setMainAddress(getMainAddress());
    }
  }, [business]);

  const handleClick = () => {
    router.push(`/business/${business.id}`);
  };

  return (
    <div className={styles.container} onClick={handleClick}>
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
      <div className={styles.txtContainer}>
        <div>{business.name}</div>
        {business.addresses.length > 0 && (
          <div className={styles.address}>{mainAddress}</div>
        )}
      </div>
    </div>
  );
};

export default Business;
