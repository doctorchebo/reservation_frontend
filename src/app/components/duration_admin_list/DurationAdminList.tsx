import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getDurationsByBusinessId } from "@/app/store/duration/durationActions";
import {
  getServicesByBusinessId,
  patchServiceDurations,
} from "@/app/store/service/serviceActions";
import { Duration } from "@/app/types/durationType";
import { IOption } from "@/app/types/option";
import { ServicePatchDurationsRequest } from "@/app/types/serviceType";
import moment from "moment";
import { useEffect } from "react";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import Typography from "../typography/Typography";

const DurationAdminList = () => {
  const dispatch = useAppDispatch();
  const { durations } = useAppSelector((state) => state.duration);
  const { services } = useAppSelector((state) => state.service);
  const { business } = useAppSelector((state) => state.business);
  useEffect(() => {
    if (business) {
      dispatch(getDurationsByBusinessId(business.id));
      dispatch(getServicesByBusinessId(business.id));
    }
  }, [business]);

  const getDurations = (durations: Duration[]) => {
    return durations.map((duration) => {
      let name = `${moment.duration(duration.duration).asMinutes()} minutos`;
      return {
        id: duration.id,
        name: name,
      } as IOption;
    });
  };

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
  return (
    business && (
      <>
        <Typography align="center" color="dark" size="large">
          Duraciones por servicio
        </Typography>
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
                    )
                  )}
                  onSuccess={handlePatchDurations}
                  options={getDurations(durations)}
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
