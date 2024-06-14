import { IOption } from "@/app/types/option";
import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./rowMultiselect.module.css";
interface RowMultiselectProps {
  title?: string;
  options: IOption[];
  initialOptions: IOption[];
  onSuccess: (options: IOption[]) => void;
}

const RowMultiselect: React.FC<RowMultiselectProps> = ({
  title,
  options,
  initialOptions,
  onSuccess,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  const handleSuccess = () => {
    onSuccess(selectedOptions);
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
        {editMode ? (
          <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.name}
            value={selectedOptions}
            onChange={(event, newValue) => {
              setSelectedOptions(newValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField {...params} variant="standard" placeholder={title} />
            )}
          />
        ) : (
          selectedOptions.map((option) => {
            return (
              <Typography
                key={option.id}
                size="small"
                color="dark"
                align="left"
              >
                {option.name}
              </Typography>
            );
          })
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
                  setSelectedOptions(initialOptions);
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

export default RowMultiselect;
