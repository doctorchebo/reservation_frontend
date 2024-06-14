import { Input } from "@mui/material";
import React, { useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./rowInput.module.css";

interface RowInputProps {
  id?: number;
  initialValue: string | number;
  title?: string;
  onSuccess: (value: string | number, id: number | undefined) => void;
}
const RowInput: React.FC<RowInputProps> = ({
  title,
  initialValue,
  onSuccess,
  id,
}) => {
  const [value, setValue] = useState<string | number>(initialValue);
  const [editMode, setEditMode] = useState(false);
  const handleSuccess = () => {
    onSuccess(value, id);
    setEditMode(false);
  };
  const handleCancel = () => {
    setEditMode(false);
    setValue(initialValue);
  };
  return (
    <tr>
      <td>
        <Typography size="medium" color="dark" align="left">
          {title}
        </Typography>
      </td>
      <td>
        {editMode ? (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
          />
        ) : (
          <Typography size="small" color="dark" align="left">
            {value}
          </Typography>
        )}
      </td>
      <td>
        <div className={styles.editContainer}>
          {editMode ? (
            <div className={styles.editBtnContainer}>
              <MdCheck color="rgb(62, 128, 70)" onClick={handleSuccess} />
              <MdCancel color="rgb(207, 62, 51)" onClick={handleCancel} />
            </div>
          ) : (
            <div className={styles.editBtnContainer}>
              <MdModeEdit
                color="rgb(96, 99, 143)"
                onClick={() => setEditMode(true)}
              />
            </div>
          )}
        </div>
      </td>
    </tr>
  );
};

export default RowInput;
