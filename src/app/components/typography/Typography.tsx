import React from "react";
import styles from "./typography.module.css";
interface TypographyProps {
  size?: "small" | "medium" | "large";
  color?: "light" | "dark";
  children?: React.ReactNode;
  align?: "left" | "center" | "right";
}
const Typography: React.FC<TypographyProps> = ({
  size,
  color,
  align,
  children,
}) => {
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

  const textAlign = align
    ? align == "right"
      ? styles.textRight
      : align == "left"
      ? styles.textLeft
      : styles.textCenter
    : styles.textCenter;

  return (
    <div
      className={[styles.container, textSize, textAlign, textColor].join(" ")}
    >
      {children}
    </div>
  );
};

export default Typography;
