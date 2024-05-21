import { Category as ICategory } from "@/app/types/categoryType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./category.module.css";

interface CardProps {
  category: ICategory;
}

const Category: React.FC<CardProps> = ({ category }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("reservation");
  };
  return (
    <div className={styles.container} onClick={handleClick}>
      {category.imageUrl && (
        <div className={styles.unsetImg}>
          <Image
            src={category.imageUrl}
            height={230}
            width={230}
            alt="category_img"
            className={styles.img}
            priority={true}
          />
        </div>
      )}
      <p className={styles.txt}>{category.name}</p>
    </div>
  );
};

export default Category;
