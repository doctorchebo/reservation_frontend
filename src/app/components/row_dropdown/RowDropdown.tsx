import { IOption } from "@/app/types/option";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./rowDropdown.module.css";
interface RowDropdownProps {
  id?: number | string;
  name?: string;
  title?: string;
  initialSelected?: number | string;
  value?: number | string;
  options: IOption[];
  onSuccess?: (selected: number | string, id?: number | string) => void;
  onChange?: (e: SelectChangeEvent<number | string>, name?: string) => void;
  createMode?: boolean;
}

const RowDropdown: React.FC<RowDropdownProps> = ({
  id,
  name,
  title,
  options,
  initialSelected,
  value,
  onSuccess,
  onChange,
  createMode,
}) => {
  const [editMode, setEditMode] = useState(createMode);
  const [selected, setSelected] = useState(initialSelected);
  const handleSuccess = () => {
    if (onSuccess && selected) {
      onSuccess(selected, id);
    }
    setEditMode(false);
  };

  useEffect(() => {
    if (initialSelected) {
      setSelected(initialSelected);
    }
  }, [initialSelected]);

  const handleOnChange = (e: SelectChangeEvent<number | string>) => {
    if (onChange) {
      onChange(e, name);
    } else {
      setSelected(e.target.value);
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
          <FormControl fullWidth>
            <Select
              value={createMode ? value : selected}
              onChange={handleOnChange}
            >
              {options.map((option) => {
                return (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        ) : (
          <Typography align="left" size="small" color="dark">
            {options.find((option) => option.id == initialSelected)?.name}
          </Typography>
        )}
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
                    setSelected(initialSelected);
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

export default RowDropdown;
