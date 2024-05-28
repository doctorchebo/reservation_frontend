import React from "react";
import styles from "./button.module.css";
interface ButtonProps {
  name: string;
  onClick?: () => void;
  disabled: boolean;
}

const Button: React.FC<ButtonProps> = ({ name, onClick, disabled }) => {
  return (
    <button className={styles.container} onClick={onClick} disabled={disabled}>
      {name}
    </button>
  );
};

export default Button;
