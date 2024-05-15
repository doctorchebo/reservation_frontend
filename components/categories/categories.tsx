import React from "react";
import styles from "./categories.module.css";
import Card from "../card/card";

const Categories = () => {
  const categories = ["Barbershops", "Dentists", "Hotels"];
  return categories.map((cat) => <Card />);
};

export default Categories;
