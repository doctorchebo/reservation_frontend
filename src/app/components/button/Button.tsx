import { forwardRef } from "react";
import styles from "./button.module.css";
interface ButtonProps {
  name: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ name, onClick, disabled }, ref) => {
    return (
      <button
        className={styles.container}
        onClick={onClick}
        disabled={disabled ? disabled : false}
        ref={ref}
      >
        {name}
      </button>
    );
  }
);

export default Button;
