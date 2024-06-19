import React from "react";
import Typography from "../typography/Typography";
interface RowTitleProps {
  title: string;
  size?: "small" | "medium" | "large";
  color?: "light" | "dark";
  colspan: number;
  align?: "left" | "center" | "right";
}

const RowTitle: React.FC<RowTitleProps> = ({
  title,
  size,
  color,
  colspan,
  align,
}) => {
  return (
    <tr>
      <td colSpan={colspan}>
        <Typography size={size} color={color} align={align}>
          {title}
        </Typography>
      </td>
    </tr>
  );
};

export default RowTitle;
