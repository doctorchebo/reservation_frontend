import { Image as IImage } from "@/app/types/imageType";
import Image from "next/image";
import React, { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import styles from "./imageList.module.css";
interface ImageListProps {
  images: IImage[];
}
const ImageList: React.FC<ImageListProps> = ({ images }) => {
  const [imageIndex, setImageindex] = useState(0);

  const handleChange = (isNext: boolean) => {
    if (isNext) {
      if (imageIndex < images.length - 1) {
        setImageindex((prev) => prev + 1);
      } else if (imageIndex === images.length - 1) {
        setImageindex(0);
      }
    } else {
      if (imageIndex > 0) {
        setImageindex((prev) => prev - 1);
      } else if (imageIndex === 0) {
        setImageindex(images.length - 1);
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.btn} onClick={() => handleChange(false)}>
        <GrPrevious size={30} color="white" />
      </div>
      <Image
        src={images[imageIndex].url}
        alt="business_img"
        width={300}
        height={300}
        priority={true}
      />
      <div className={styles.btn} onClick={() => handleChange(true)}>
        <GrNext size={30} color="white" />
      </div>
    </div>
  );
};

export default ImageList;
