import React from "react";
import styles from "./badge.module.css";
interface BadgeProps {
  children?: React.ReactNode;
  backgroundColor?: "light" | "dark";
}
const Badge: React.FC<BadgeProps> = ({ children, backgroundColor }) => {
  const bgColor = backgroundColor
    ? backgroundColor == "dark"
      ? styles.bgLight
      : styles.bgDark
    : styles.bgLight;
  return (
    <div className={[styles.container, bgColor].join(" ")}>{children}</div>
  );
};

export default Badge;
