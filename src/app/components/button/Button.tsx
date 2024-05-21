import React from "react";
interface ButtonProps {
  name: string;
  onClick?: (event: MouseEvent) => void;
}

const Button: React.FC<ButtonProps> = () => {
  return <div>Button</div>;
};

export default Button;
