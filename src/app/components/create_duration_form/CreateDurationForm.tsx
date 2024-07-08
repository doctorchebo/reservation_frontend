import { ChangeEvent, useState } from "react";

import { useAppSelector } from "@/app/hooks/hooks";
import { DurationCreateRequest } from "@/app/types/durationType";
import { IOption } from "@/app/types/option";
import { getDefaultDurations } from "@/app/utils/getDefaultDurations";
import { SelectChangeEvent } from "@mui/material";
import Button from "../button/Button";
import RowDropdown from "../row_dropdown/RowDropdown";
import styles from "./createDurationForm.module.css";

interface CreateDurationForm {
  onSuccess: (value: DurationCreateRequest) => void;
}
const CreateDurationForm: React.FC<CreateDurationForm> = ({ onSuccess }) => {
  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  };
  const { business } = useAppSelector((state) => state.business);
  const { durations } = useAppSelector((state) => state.duration);

  const [duration, setDuration] = useState({
    duration: "",
    serviceId: "",
    businessId: 1,
  });
  const handleSuccess = () => {
    if (business) {
      onSuccess({
        duration: duration.duration,
        businessId: business.id,
      } as DurationCreateRequest);
      setVisible(false);
    }
  };

  const handleOnChange = (
    e:
      | SelectChangeEvent<number | string>
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | IOption[]
      | boolean
      | number,
    optionName?: string | undefined
  ) => {
    if (optionName) {
      if (typeof e == "boolean" || typeof e == "number") {
        setDuration((prev) => ({
          ...prev,
          [optionName]: e,
        }));
      } else {
        if (Array.isArray(e)) {
          setDuration((prev) => ({
            ...prev,
            [optionName]: e,
          }));
        } else {
          const { value } = e.target;
          setDuration((prev) => ({
            ...prev,
            [optionName]: value,
          }));
        }
      }
    }
  };
  return (
    <div className={styles.container}>
      {visible ? (
        <>
          <div className={styles.createForm}>
            <table>
              <tbody>
                {durations && (
                  <RowDropdown
                    name="duration"
                    value={duration.duration}
                    options={getDefaultDurations(
                      durations.map((duration) => {
                        return duration.duration;
                      })
                    )}
                    title="Duración"
                    onChange={handleOnChange}
                    createMode={true}
                  />
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.actionButtons}>
            <Button onClick={handleSuccess}>Guardar</Button>
            <Button type="cancel" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </>
      ) : (
        <div className={styles.btn}>
          <Button onClick={() => setVisible(true)} type="success">
            Crear Duración
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateDurationForm;
