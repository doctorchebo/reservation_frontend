import { forwardRef } from "react";
import styles from "./button.module.css";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "success" | "cancel" | "default";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, disabled, type }, ref) => {
    const btnType = type
      ? type === "success"
        ? styles.success
        : type === "cancel"
        ? styles.cancel
        : styles.default
      : styles.default;
    return (
      <button
        className={[styles.container, btnType].join(" ")}
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
