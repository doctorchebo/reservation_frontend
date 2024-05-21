"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getCategories } from "@/app/store/category/categoryActions";
import { useEffect } from "react";
import CategoryCard from "../category/category";
import styles from "./categories.module.css";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.category
  );
  useEffect(() => {
    dispatch(getCategories());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <div className={styles.container}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
