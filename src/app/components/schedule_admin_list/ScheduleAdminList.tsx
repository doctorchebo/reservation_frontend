import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllAddressesByBusinessId } from "@/app/store/address/addressActions";
import { getAllMembersByBusinessId } from "@/app/store/member/memberActions";
import {
  createSchedule,
  getAllSchedulesByBusinessId,
} from "@/app/store/schedule/scheduleActions";
import { setSuccess } from "@/app/store/schedule/scheduleSlice";
import { IScheduleCreateRequest } from "@/app/types/scheduleType";
import { createToast } from "@/app/utils/createToast";
import { getDayOfWeek } from "@/app/utils/getDayOfWeek";
import { getDaysOfWeek } from "@/app/utils/getDaysOfWeek";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from "../confirmation_dialog/ConfirmationDialog";
import CreateScheduleForm from "../create_schedule_form/CreateScheduleForm";
import RowButton from "../row_button/RowButton";
import RowCheckbox from "../row_checkbox/RowCheckbox";
import RowDropdown from "../row_dropdown/RowDropdown";
import RowTimePicker from "../row_time_picker/RowTimePicker";
import RowTitle from "../row_title/RowTitle";
import Typography from "../typography/Typography";

const ScheduleAdminList = () => {
  const dispatch = useAppDispatch();
  const { business } = useAppSelector((state) => state.business);
  const { members } = useAppSelector((state) => state.member);
  const { schedules, success } = useAppSelector((state) => state.schedule);
  useEffect(() => {
    if (business) {
      dispatch(getAllMembersByBusinessId(business.id));
      dispatch(getAllSchedulesByBusinessId(business.id));
    }
  }, [business]);

  useEffect(() => {
    if (success) {
      createToast("¡Éxito!", "success", 3000);
      dispatch(setSuccess(false));
    }
  }, [success]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const handleDeleteCalendar = () => {};

  const handleOpenModal = (id?: string | number | undefined) => {
    setSelectedId(id as number);
    setOpenModal(true);
  };

  const handlePatchDayOfWeek = (
    selected: number,
    id?: string | number | undefined
  ) => {};

  const handlePatchIsWholeDay = (
    checked: boolean,
    id?: number | undefined
  ) => {};

  const handlePatchStartTime = (value: dayjs.Dayjs) => {};
  const handlePatchEndTime = (value: dayjs.Dayjs) => {};
  const handleCreateSchedule = (request: IScheduleCreateRequest) => {
    dispatch(createSchedule(request));
    dispatch(getAllAddressesByBusinessId(business!.id));
  };

  return (
    <>
      <ConfirmationDialog
        cancelText="Cancelar"
        onCancel={() => setOpenModal(false)}
        onSuccess={handleDeleteCalendar}
        open={openModal}
        successText="Eliminar"
        title="Eliminar servicio"
        content="¿Estás seguro de eliminar el calendario?"
      />
      <Typography color="dark" size="large">
        Horarios
      </Typography>
      <table>
        <tbody>
          {members.map((member) => {
            return (
              <React.Fragment key={member.id}>
                <RowTitle
                  key={`member-${member.id}`}
                  colspan={2}
                  color="dark"
                  size="medium"
                  title={`${member.firstName} ${member.lastName}`}
                />
                <tr>
                  <td>
                    <CreateScheduleForm
                      onSuccess={handleCreateSchedule}
                      calendarId={member.calendar.id}
                    />
                  </td>
                </tr>
                <RowTitle
                  key={`title-${member.id}`}
                  colspan={2}
                  title="Horarios:"
                  align="left"
                  color="dark"
                  size="medium"
                />
                {member.calendar.scheduleIds &&
                  schedules &&
                  schedules
                    .filter((schedule) =>
                      member.calendar.scheduleIds.includes(schedule.id)
                    )
                    .map((schedule, index) => {
                      return (
                        <React.Fragment key={index}>
                          <RowDropdown
                            key={`dayOfWeek-${schedule.id}`}
                            id={schedule.id}
                            name="dayOfWeek"
                            onSuccess={handlePatchDayOfWeek}
                            title={"Día de la semana"}
                            options={getDaysOfWeek()}
                            initialSelected={getDayOfWeek(schedule.id).id}
                          />
                          <RowCheckbox
                            key={`isWholeDay-${schedule.id}`}
                            id={schedule.id}
                            name="dayOfWeek"
                            onSuccess={handlePatchIsWholeDay}
                            title={"Todo el día"}
                            initialValue={schedule.isWholeDay}
                          />
                          <RowTimePicker
                            key={`startDate-${schedule.id}`}
                            id={schedule.id}
                            title="Hora de inicio"
                            initialValue={schedule.startTime}
                            onSuccess={handlePatchEndTime}
                          />
                          <RowTimePicker
                            key={`endDate-${schedule.id}`}
                            id={schedule.id}
                            title="Hora de fin"
                            initialValue={schedule.endTime}
                            onSuccess={handlePatchStartTime}
                          />
                        </React.Fragment>
                      );
                    })}
                <RowButton
                  onClick={handleOpenModal}
                  title="Eliminar"
                  id={member.calendar.id}
                  type="cancel"
                />
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ScheduleAdminList;
