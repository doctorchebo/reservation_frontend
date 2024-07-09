import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./rowInput.module.css";

interface RowInputProps {
  id?: number |string;
  initialValue?: string | number;
  value?: string | number;
  title?: string;
  onSuccess?: (
    value: string | number | undefined,
    id: number | string | undefined
  ) => void;
  createMode?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    name?: string
  ) => void;
  name?: string;
}
const RowInput: React.FC<RowInputProps> = ({
  title,
  name,
  initialValue,
  value,
  onSuccess,
  id,
  createMode = false,
  onChange,
}) => {
  const [internalValue, setInternalValue] = useState<string | number>(
    initialValue || ""
  );

  useEffect(() => {
    if (initialValue) {
      setInternalValue(initialValue);
    }
  }, [initialValue]);

  const [editMode, setEditMode] = useState(createMode);

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess(internalValue, id);
    }
    setEditMode(false);
  };
  const handleCancel = () => {
    setEditMode(false);
    setInternalValue(initialValue || "");
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e) {
      if (onChange) {
        onChange(e, name);
      } else {
        setInternalValue(e.target.value);
      }
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
        {editMode ? (
          <Input
            value={value ? value : internalValue}
            onChange={handleOnChange}
            fullWidth
          />
        ) : (
          <Typography size="small" color="dark" align="left">
            {value ? value : internalValue}
          </Typography>
        )}
      </td>
      {!createMode && (
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
      )}
    </tr>
  );
};

export default RowInput;
