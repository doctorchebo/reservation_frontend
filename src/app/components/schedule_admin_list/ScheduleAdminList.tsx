import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllMembersByBusinessId } from "@/app/store/member/memberActions";
import {
  createSchedule,
  deleteSchedule,
  getAllSchedulesByBusinessId,
  patchScheduleDayOfWeek,
  patchScheduleEndTime,
  patchScheduleIsWholeDay,
  patchScheduleStartTime,
} from "@/app/store/schedule/scheduleActions";
import { setError, setSuccess } from "@/app/store/schedule/scheduleSlice";
import { Member } from "@/app/types/memberType";
import { IOption } from "@/app/types/option";
import {
  ScheduleCreateRequest,
  SchedulePatchDayOfWeekRequest,
  SchedulePatchEndTime,
  SchedulePatchIsWholeDay,
  SchedulePatchStartTime,
} from "@/app/types/scheduleType";
import { scheduleComparator } from "@/app/utils/comparators";
import { createToast } from "@/app/utils/createToast";
import { getDayOfWeek } from "@/app/utils/getDayOfWeek";
import { getDaysOfWeek } from "@/app/utils/getDaysOfWeek";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from "../confirmation_dialog/ConfirmationDialog";
import CreateScheduleForm from "../create_schedule_form/CreateScheduleForm";
import Loader from "../loader/Loader";
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
  const { schedules, success, error } = useAppSelector(
    (state) => state.schedule
  );
  const [loading, setLoading] = useState(true);
  const [member, setMember] = useState<Member | undefined>();

  useEffect(() => {
    if (members.length > 0) {
      setMember(members[0]);
    }
  }, [members]);

  useEffect(() => {
    const fetchData = async () => {
      if (business) {
        await dispatch(getAllMembersByBusinessId(business.id));
        await dispatch(getAllSchedulesByBusinessId(business.id));
        setLoading(false);
      }
    };
    fetchData();
  }, [business]);

  useEffect(() => {
    if (success) {
      createToast("¡Éxito!", "success", 3000);
      dispatch(setSuccess(false));
      business && dispatch(getAllSchedulesByBusinessId(business.id));
    }
  }, [success, business]);

  useEffect(() => {
    if (error) {
      createToast(error.error, "error", 5000);
      dispatch(setSuccess(false));
      setTimeout(() => {
        dispatch(setError(undefined));
      }, 5000);
    }
  }, [error]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleDeleteSchedule = async () => {
    selectedId && (await dispatch(deleteSchedule(selectedId)));
    setOpenModal(false);
  };

  const handleOpenModal = (id?: string | number | undefined) => {
    setSelectedId(id as number);
    setOpenModal(true);
  };

  const handlePatchDayOfWeek = (
    dayOfWeek: number,
    scheduleId?: string | number | undefined
  ) => {
    dispatch(
      patchScheduleDayOfWeek({
        scheduleId: scheduleId,
        dayOfWeek: dayOfWeek,
      } as SchedulePatchDayOfWeekRequest)
    );
  };

  const handlePatchIsWholeDay = (
    isWholeDay: boolean,
    scheduleId?: number | undefined
  ) => {
    dispatch(
      patchScheduleIsWholeDay({
        scheduleId: scheduleId,
        isWholeDay: isWholeDay,
      } as SchedulePatchIsWholeDay)
    );
  };

  const handlePatchStartTime = (
    startTime: number,
    scheduleId?: string | number | undefined
  ) => {
    dispatch(
      patchScheduleStartTime({
        scheduleId: scheduleId,
        startTime: startTime / 1000,
      } as SchedulePatchStartTime)
    );
  };
  const handlePatchEndTime = (
    endTime: number,
    scheduleId?: string | number | undefined
  ) => {
    dispatch(
      patchScheduleEndTime({
        scheduleId: scheduleId,
        endTime: endTime / 1000,
      } as SchedulePatchEndTime)
    );
  };
  const handleCreateSchedule = (request: ScheduleCreateRequest) => {
    dispatch(createSchedule(request));
  };

  const handleChangeMember = (
    selected: number,
    id?: string | number | undefined
  ) => {
    setMember(members.find((member) => member.id === selected));
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <ConfirmationDialog
        cancelText="Cancelar"
        onCancel={() => setOpenModal(false)}
        onSuccess={handleDeleteSchedule}
        open={openModal}
        successText="Eliminar"
        title="Eliminar horario"
        content="¿Estás seguro de eliminar el horario?"
      />
      <Typography color="dark" size="large">
        Horarios
      </Typography>
      <table>
        <tbody>
          {member && (
            <RowDropdown
              createMode={true}
              options={members.map((member) => {
                return {
                  id: member.id,
                  name: `${member.firstName} ${member.lastName}`,
                } as IOption;
              })}
              name="member"
              title="Miembro"
              onChange={handleChangeMember}
              value={member.id}
            />
          )}
          {member && (
            <React.Fragment key={member.id}>
              <tr>
                <td>
                  <CreateScheduleForm
                    onSuccess={handleCreateSchedule}
                    // we need the calendar id to fetch all it's corresponding schedules
                    calendarId={member.calendar.id}
                  />
                </td>
              </tr>
              {member.calendar.scheduleIds.length > 0 && (
                <RowTitle
                  key={`title-${member.id}`}
                  colspan={2}
                  title="Horarios:"
                  align="left"
                  color="dark"
                  size="medium"
                />
              )}
              {schedules.toSorted(scheduleComparator).map((schedule, index) => {
                if (member.calendar.scheduleIds.includes(schedule.id)) {
                  return (
                    <React.Fragment key={index}>
                      <RowDropdown
                        key={`dayOfWeek-${schedule.id}`}
                        id={schedule.id}
                        name="dayOfWeek"
                        onSuccess={handlePatchDayOfWeek}
                        title={"Día de la semana"}
                        options={getDaysOfWeek(
                          schedules
                            .filter((sch) =>
                              member.calendar.scheduleIds
                                .filter(
                                  (scheduleId) => scheduleId !== schedule.id
                                )
                                .includes(sch.id)
                            )
                            .map((s) => {
                              return s.dayOfWeek;
                            }),
                          true
                        )}
                        initialSelected={
                          getDayOfWeek(schedule.dayOfWeek - 1).id
                        }
                      />
                      <RowCheckbox
                        key={`isWholeDay-${schedule.id}`}
                        id={schedule.id}
                        name="dayOfWeek"
                        onSuccess={handlePatchIsWholeDay}
                        title={"Todo el día"}
                        initialValue={schedule.isWholeDay}
                      />
                      {!schedule.isWholeDay && (
                        <>
                          <RowTimePicker
                            error={error != undefined}
                            key={`startDate-${schedule.id}`}
                            id={schedule.id}
                            title="Hora de inicio"
                            initialValue={
                              schedule.startTime
                                ? dayjs(schedule.startTime)
                                : dayjs(
                                    `${
                                      new Date("2024-01-01T09:00:00")
                                        .toISOString()
                                        .split("T")[0]
                                    }T09:00`
                                  )
                            }
                            onSuccess={handlePatchStartTime}
                          />
                          <RowTimePicker
                            error={error != undefined}
                            key={`endDate-${schedule.id}`}
                            id={schedule.id}
                            title="Hora de fin"
                            initialValue={
                              schedule.endTime
                                ? dayjs(schedule.endTime)
                                : dayjs(
                                    `${
                                      new Date("2024-01-01T17:00:00")
                                        .toISOString()
                                        .split("T")[0]
                                    }T17:00`
                                  )
                            }
                            onSuccess={handlePatchEndTime}
                          />
                        </>
                      )}
                      <RowButton
                        onClick={handleOpenModal}
                        title="Eliminar"
                        id={schedule.id}
                        type="cancel"
                      />
                    </React.Fragment>
                  );
                } else {
                  <></>;
                }
              })}
            </React.Fragment>
          )}
        </tbody>
      </table>
    </>
  );
};

export default ScheduleAdminList;
