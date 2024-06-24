import React from "react";
import Button from "../button/Button";

interface RowButtonProps {
  title: string;
  id?: number | string;
  onClick: (id?: number | string) => void;
  type?: "success" | "cancel" | "default";
}
const RowButton: React.FC<RowButtonProps> = ({ title, onClick, id, type }) => {
  return (
    <tr>
      <td>
        <Button onClick={() => onClick(id)} type={type}>
          {title}
        </Button>
      </td>
    </tr>
  );
};

export default RowButton;
