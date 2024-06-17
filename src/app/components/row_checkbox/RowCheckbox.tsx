import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./rowCheckbox.module.css";

interface RowCheckboxProps {
  id?: number;
  title?: string;
  enabled: boolean;
  onSuccess: (checked: boolean, id?: number) => void;
}

const RowCheckbox: React.FC<RowCheckboxProps> = ({
  title,
  enabled,
  onSuccess,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [checked, setChecked] = useState(enabled);
  const handleSuccess = () => {
    onSuccess(checked);
    setEditMode(false);
  };
  return (
    <tr>
      <td>
        <Typography size="medium" color="dark" align="left">
          {title}
        </Typography>
      </td>
      <td>
        <Checkbox
          disabled={!editMode}
          checked={checked}
          onChange={() => setChecked((prev) => !prev)}
          sx={{
            color: "rgb(65, 67, 97)",
          }}
        />
      </td>
      <td>
        <div className={styles.editContainer}>
          {editMode ? (
            <div className={styles.editBtnContainer}>
              <MdCheck color="rgb(62, 128, 70)" onClick={handleSuccess} />
              <MdCancel
                color="rgb(207, 62, 51)"
                onClick={() => {
                  setChecked(enabled);
                  setEditMode(false);
                }}
              />
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

export default RowCheckbox;
