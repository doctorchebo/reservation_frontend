import React from "react";
import styles from "./button.module.css";
interface ButtonProps {
  name: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ name, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {name}
    </div>
  );
};

export default Button;
