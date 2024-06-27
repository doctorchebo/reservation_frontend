import {
  LocalizationProvider,
  PickerChangeHandlerContext,
  TimePicker,
  TimeValidationError,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./rowTimePicker.module.css";

interface RowTimePickerProps {
  createMode?: boolean;
  initialValue?: number;
  id?: number | string;
  name?: string;
  onChange?: (value: dayjs.Dayjs, name?: string) => void;
  onSuccess?: (value: Dayjs) => void;
  title: string;
  value?: Dayjs;
}
const RowTimePicker: React.FC<RowTimePickerProps> = ({
  createMode,
  initialValue,
  id,
  name,
  onChange,
  onSuccess,
  title,
  value,
}) => {
  const [time, setTime] = useState<Dayjs | null>(dayjs(initialValue));
  const [editMode, setEditMode] = useState(createMode);
  const handleOnChange = (
    value: dayjs.Dayjs | null,
    context: PickerChangeHandlerContext<TimeValidationError>
  ) => {
    if (onChange) {
      onChange(value!, name);
    } else {
      setTime(value);
    }
  };
  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess(time!);
    }
    setEditMode(false);
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={value ? value : time}
              onChange={handleOnChange}
              minutesStep={30}
            />
          </LocalizationProvider>
        ) : (
          <Typography color="dark" size="small">
            {value ? value.format("HH:mm") : time!.format("HH:mm")}
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
                    setTime(dayjs(initialValue));
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

export default RowTimePicker;
