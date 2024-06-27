import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllDurationsByBusinessId } from "@/app/store/duration/durationActions";
import { getAllMembersByBusinessId } from "@/app/store/member/memberActions";
import { getAllSchedulesByCalendarId } from "@/app/store/schedule/scheduleActions";
import { IOption } from "@/app/types/option";
import { IScheduleCreateRequest } from "@/app/types/scheduleType";
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
  onSuccess: (value: IScheduleCreateRequest) => void;
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
    if (business && calendarId) {
      dispatch(getAllMembersByBusinessId(business.id));
      dispatch(getAllDurationsByBusinessId(business.id));
      dispatch(getAllSchedulesByCalendarId(calendarId));
    }
  }, [business, calendarId]);

  const [newSchedule, setNewSchedule] = useState({
    calendarId: calendarId,
    dayOfWeek: 1,
    isWholeDay: false,
    startTime: 0,
    endTime: 0,
  });

  useEffect(() => {
    if (schedules) {
      setNewSchedule((prev) => {
        return {
          ...prev,
          dayOfWeek: days.filter(
            (day) => !schedules.map((s) => s.dayOfWeek).includes(day)
          )[0],
        };
      });
    }
  }, [schedules]);

  const handleSuccess = () => {
    if (business) {
      onSuccess({
        calendarId: calendarId,
        dayOfWeek: newSchedule.dayOfWeek,
        startTime: newSchedule.isWholeDay ? null : newSchedule.startTime,
        endTime: newSchedule.isWholeDay ? null : newSchedule.endTime,
        isWholeDay: newSchedule.isWholeDay,
      } as IScheduleCreateRequest);
      setVisible(false);
    }
  };

  const handleOnChange = (
    e:
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | IOption[]
      | boolean
      | number
      | Dayjs,
    optionName?: string | undefined
  ) => {
    if (optionName) {
      if (typeof e == "boolean" || typeof e == "number" || e instanceof Dayjs) {
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
                <RowDropdown
                  options={getDaysOfWeek(
                    schedules.map((schedule) => {
                      return schedule.dayOfWeek;
                    })
                  )}
                  createMode={true}
                  name="dayOfWeek"
                  onChange={handleOnChange}
                  title="Día de la semana"
                  value={newSchedule.dayOfWeek}
                />
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
                      name="startDate"
                      value={dayjs(
                        `${new Date().toISOString().split("T")[0]}T09:00`
                      )}
                    />
                    <RowTimePicker
                      onChange={handleOnChange}
                      title="Hora de fin"
                      createMode={true}
                      name="endDate"
                      value={dayjs(
                        `${new Date().toISOString().split("T")[0]}T17:00`
                      )}
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
