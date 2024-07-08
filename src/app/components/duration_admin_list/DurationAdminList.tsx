import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  createDuration,
  getAllDurationsByBusinessId,
} from "@/app/store/duration/durationActions";
import {
  getServicesByBusinessId,
  patchServiceDurations,
} from "@/app/store/service/serviceActions";
import { DurationCreateRequest } from "@/app/types/durationType";
import { IOption } from "@/app/types/option";
import { ServicePatchDurationsRequest } from "@/app/types/serviceType";
import { getDurations } from "@/app/utils/getDurations";
import { useEffect } from "react";
import CreateDurationForm from "../create_duration_form/CreateDurationForm";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import Typography from "../typography/Typography";

const DurationAdminList = () => {
  const dispatch = useAppDispatch();
  const { durations } = useAppSelector((state) => state.duration);
  const { services } = useAppSelector((state) => state.service);
  const { business } = useAppSelector((state) => state.business);
  useEffect(() => {
    if (business) {
      dispatch(getAllDurationsByBusinessId(business.id));
      dispatch(getServicesByBusinessId(business.id));
    }
  }, [business]);

  const handlePatchDurations = (options: IOption[], id?: number | string) => {
    if (business && id) {
      dispatch(
        patchServiceDurations({
          serviceId: id,
          durationIds: options.map((s) => {
            return s.id;
          }),
        } as ServicePatchDurationsRequest)
      );
      dispatch(getServicesByBusinessId(business.id));
    }
  };

  const handleCreateDuration = (request: DurationCreateRequest) => {
    dispatch(createDuration(request));
  };
  return (
    business && (
      <>
        <Typography align="center" color="dark" size="large">
          Duraciones por servicio
        </Typography>
        <CreateDurationForm onSuccess={handleCreateDuration} />
        <table>
          <tbody>
            {services.map((service) => {
              return (
                <RowMultiselect
                  key={service.id}
                  id={service.id}
                  title={service.name}
                  initialOptions={getDurations(
                    durations.filter((duration) =>
                      duration.serviceIds.includes(service.id.toString())
                    ),
                    { type: "minutes" }
                  )}
                  onSuccess={handlePatchDurations}
                  options={getDurations(durations, { type: "minutes" })}
                />
              );
            })}
          </tbody>
        </table>
      </>
    )
  );
};

export default DurationAdminList;
