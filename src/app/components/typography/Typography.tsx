import React from "react";
import styles from "./typography.module.css";
interface TypographyProps {
  size?: "small" | "medium" | "large";
  color?: "light" | "dark";
  children?: React.ReactNode;
}
const Typography: React.FC<TypographyProps> = ({ size, color, children }) => {
  const textSize = size
    ? size == "small"
      ? styles.small
      : size == "medium"
      ? styles.medium
      : styles.large
    : styles.medium;

  const textColor = color
    ? color == "dark"
      ? styles.colorDark
      : styles.colorLight
    : styles.colorLight;

  return (
    <div className={[styles.container, textSize, textColor].join(" ")}>
      {children}
    </div>
  );
};

export default Typography;
