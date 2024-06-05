import { forwardRef } from "react";
import styles from "./button.module.css";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, disabled }, ref) => {
    return (
      <button
        className={styles.container}
        onClick={onClick}
        disabled={disabled ? disabled : false}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
