import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllDurationsByBusinessId } from "@/app/store/duration/durationActions";
import { getAllSchedulesByCalendarId } from "@/app/store/schedule/scheduleActions";
import { IOption } from "@/app/types/option";
import { ScheduleCreateRequest } from "@/app/types/scheduleType";
import { getDaysOfWeek } from "@/app/utils/getDaysOfWeek";
import dayjs, { Dayjs } from "dayjs";
import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../button/Button";
import RowCheckbox from "../row_checkbox/RowCheckbox";
import RowDropdown from "../row_dropdown/RowDropdown";
import RowTimePicker from "../row_time_picker/RowTimePicker";
import styles from "./createScheduleForm.module.css";
interface CreateScheduleFormProps {
  calendarId: number;
  onSuccess: (value: ScheduleCreateRequest) => void;
}

const CreateScheduleForm: React.FC<CreateScheduleFormProps> = ({
  calendarId,
  onSuccess,
}) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const { business } = useAppSelector((state) => state.business);
  const { schedules } = useAppSelector((state) => state.schedule);
  const days = [1, 2, 3, 4, 5, 6, 7];
  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (business && calendarId && visible) {
      dispatch(getAllDurationsByBusinessId(business.id));
      dispatch(getAllSchedulesByCalendarId(calendarId));
    }
  }, [business, calendarId, visible]);

  const [newSchedule, setNewSchedule] = useState<{
    calendarId: number;
    dayOfWeek: undefined | number;
    isWholeDay: boolean;
    startTime: Dayjs | undefined;
    endTime: Dayjs | undefined;
  }>({
    calendarId: calendarId,
    dayOfWeek: undefined,
    isWholeDay: false,
    startTime: dayjs(
      `${new Date("2024-01-01T09:00:00").toISOString().split("T")[0]}T09:00`
    ),
    endTime: dayjs(
      `${new Date("2024-01-01T17:00:00").toISOString().split("T")[0]}T17:00`
    ),
  });

  useEffect(() => {
    if (schedules) {
      setNewSchedule((prev) => {
        return {
          ...prev,
          dayOfWeek: days.filter(
            (day) => !schedules.map((s) => s.dayOfWeek - 1).includes(day)
          )[0],
        };
      });
    }
  }, [schedules]);

  const handleSuccess = () => {
    if (business) {
      onSuccess({
        calendarId: calendarId,
        dayOfWeek: newSchedule.dayOfWeek!,
        startTime: newSchedule.isWholeDay
          ? undefined
          : newSchedule.startTime!.valueOf() / 1000,
        endTime: newSchedule.isWholeDay
          ? undefined
          : newSchedule.endTime!.valueOf() / 1000,
        isWholeDay: newSchedule.isWholeDay,
      } as ScheduleCreateRequest);
      setVisible(false);
    }
  };

  const handleOnChange = (
    e:
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | IOption[]
      | boolean
      | number,
    optionName?: string | undefined
  ) => {
    if (optionName) {
      if (typeof e == "boolean" || typeof e == "number") {
        setNewSchedule((prev) => ({
          ...prev,
          [optionName]: e,
        }));
      } else {
        if (Array.isArray(e)) {
          setNewSchedule((prev) => ({
            ...prev,
            [optionName]: e,
          }));
        } else {
          const { value } = e.target;
          setNewSchedule((prev) => ({
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
                {newSchedule.dayOfWeek && (
                  <RowDropdown
                    options={getDaysOfWeek(
                      schedules.map((schedule) => {
                        return schedule.dayOfWeek;
                      })
                    , true)}
                    createMode={true}
                    name="dayOfWeek"
                    onChange={handleOnChange}
                    title="Día de la semana"
                    value={newSchedule.dayOfWeek}
                  />
                )}
                <RowCheckbox
                  createMode={true}
                  name="isWholeDay"
                  onChange={handleOnChange}
                  title="Todo el día"
                  value={newSchedule.isWholeDay}
                />
                {!newSchedule.isWholeDay && (
                  <>
                    <RowTimePicker
                      onChange={handleOnChange}
                      title="Hora de inicio"
                      createMode={true}
                      name="startTime"
                      value={newSchedule.startTime}
                    />
                    <RowTimePicker
                      onChange={handleOnChange}
                      title="Hora de fin"
                      createMode={true}
                      name="endTime"
                      value={newSchedule.endTime}
                    />
                  </>
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
            Crear Horario
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateScheduleForm;
