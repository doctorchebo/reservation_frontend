import { Checkbox } from "@mui/material";
import React, { useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./rowCheckbox.module.css";

interface RowCheckboxProps {
  id?: number;
  name?: string;
  title?: string;
  initialValue: boolean;
  onSuccess?: (checked: boolean, id?: number | undefined) => void;
  createMode?: boolean;
  onChange?: (checked: boolean, name?: string) => void;
  value?: boolean;
}

const RowCheckbox: React.FC<RowCheckboxProps> = ({
  id,
  name,
  title,
  initialValue,
  onSuccess,
  onChange,
  value,
  createMode,
}) => {
  const [editMode, setEditMode] = useState(createMode);
  const [checked, setChecked] = useState(initialValue);
  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess(checked, id);
    }
    setEditMode(false);
  };

  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (onChange) {
      onChange(checked, name);
    } else {
      setChecked((prev) => !prev);
    }
  };
  return (
    <tr>
      <td>
        <Typography size="medium" color="dark" align="left">
          {title}:
        </Typography>
      </td>
      <td>
        <Checkbox
          disabled={!editMode}
          checked={createMode ? value : checked}
          onChange={handleOnChange}
          sx={{
            color: "rgb(65, 67, 97)",
          }}
        />
      </td>
      {!createMode && (
        <td>
          <div className={styles.editContainer}>
            {editMode ? (
              <div className={styles.editBtnContainer}>
                <MdCheck color="rgb(62, 128, 70)" onClick={handleSuccess} />
                <MdCancel
                  color="rgb(207, 62, 51)"
                  onClick={() => {
                    setChecked(initialValue);
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
      )}
    </tr>
  );
};

export default RowCheckbox;
