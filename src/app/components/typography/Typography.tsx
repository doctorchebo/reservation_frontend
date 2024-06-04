import React from "react";
import styles from "./typography.module.css";
interface TypographyProps {
  size?: "small" | "medium" | "large";
  color?: string;
  children?: React.ReactNode;
}
const Typografy: React.FC<TypographyProps> = ({ size, color, children }) => {
  const textSize = size
    ? size == "small"
      ? styles.small
      : size == "medium"
      ? styles.medium
      : styles.large
    : styles.medium;

  const textColor = color ? color : styles.color;

  return (
    <div className={[styles.container, textSize, textColor].join(" ")}>
      {children}
    </div>
  );
};

export default Typografy;
