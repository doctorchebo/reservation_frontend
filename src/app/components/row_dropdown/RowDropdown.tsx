import { IOption } from "@/app/types/option";
import { FormControl, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./rowDropdown.module.css";
interface RowDropdownProps {
  id?: number | string;
  title?: string;
  initialSelected: number;
  options: IOption[];
  onSuccess: (selected: number, id?: number | string) => void;
}

const RowDropdown: React.FC<RowDropdownProps> = ({
  id,
  title,
  options,
  initialSelected,
  onSuccess,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState(initialSelected);
  const handleSuccess = () => {
    onSuccess(selected, id);
    setEditMode(false);
  };

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

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
              defaultValue={initialSelected}
              value={selected}
              onChange={(e) => setSelected(e.target.value as number)}
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
    </tr>
  );
};

export default RowDropdown;
