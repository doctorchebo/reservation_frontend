import { IOption } from "@/app/types/option";
import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Badge from "../badge/Badge";
import Typography from "../typography/Typography";
import styles from "./rowMultiselect.module.css";
interface RowMultiselectProps {
  createMode?: boolean;
  id?: number | string;
  title?: string;
  options: IOption[];
  initialOptions?: IOption[];
  onSuccess?: (options: IOption[], id?: number | string) => void;
  name?: string;
  onChange?: (options: IOption[], name?: string) => void;
  value?: IOption[];
}

const RowMultiselect: React.FC<RowMultiselectProps> = ({
  id,
  title,
  options,
  initialOptions,
  onSuccess,
  createMode = false,
  onChange,
  value,
  name,
}) => {
  const [editMode, setEditMode] = useState(createMode);
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>(
    initialOptions || []
  );

  /*   useEffect(() => {
    if (initialOptions) {
      console.log("setting initial options:" + JSON.stringify(initialOptions));
      setSelectedOptions(initialOptions);
    }
  }, [initialOptions]); */

  const handleSuccess = () => {
    if (selectedOptions && onSuccess) {
      onSuccess(selectedOptions, id);
    }
    setEditMode(false);
  };

  const handleOnChange = (newValue: IOption[]) => {
    if (onChange) {
      onChange(newValue, name);
    } else {
      setSelectedOptions(newValue);
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
          <Autocomplete
            multiple
            options={options}
            getOptionLabel={(option) => option.name}
            value={value ? value : selectedOptions}
            onChange={(event, newValue) => {
              handleOnChange(newValue);
            }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField {...params} variant="standard" placeholder={title} />
            )}
          />
        ) : (
          <div className={styles.optionsContainer}>
            {selectedOptions &&
              selectedOptions.map((option) => {
                return (
                  <Badge key={option.id}>
                    <Typography size="small" color="dark" align="left">
                      {option.name}
                    </Typography>
                  </Badge>
                );
              })}
          </div>
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
                    setSelectedOptions(initialOptions!);
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

export default RowMultiselect;
