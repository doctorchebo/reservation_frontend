import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  createDuration,
  getAllDurationsByBusinessId,
} from "@/app/store/duration/durationActions";
import { setSuccess } from "@/app/store/duration/durationSlice";
import {
  getServicesByBusinessId,
  patchServiceDurations,
} from "@/app/store/service/serviceActions";
import { DurationCreateRequest } from "@/app/types/durationType";
import { IOption } from "@/app/types/option";
import { ServicePatchDurationsRequest } from "@/app/types/serviceType";
import { createToast } from "@/app/utils/createToast";
import { getDurationsInHoursAndMinutes } from "@/app/utils/getDurations";
import { useEffect, useState } from "react";
import CreateDurationForm from "../create_duration_form/CreateDurationForm";
import Loader from "../loader/Loader";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import Typography from "../typography/Typography";

const DurationAdminList = () => {
  const dispatch = useAppDispatch();
  const { durations, success: dSuccess } = useAppSelector(
    (state) => state.duration
  );
  const { services, success: sSuccess } = useAppSelector(
    (state) => state.service
  );
  const [loading, setLoading] = useState(true);
  const { business } = useAppSelector((state) => state.business);
  useEffect(() => {
    const fetchData = async () => {
      if (business) {
        dispatch(getAllDurationsByBusinessId(business.id));
        dispatch(getServicesByBusinessId(business.id));
        setLoading(false);
      }
    };
    fetchData();
  }, [business]);

  useEffect(() => {
    if (dSuccess || sSuccess) {
      createToast("Éxito!", "success", 3000);
      dispatch(setSuccess(false));
    }
  }, [dSuccess, sSuccess]);

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
    }
  };

  const handleCreateDuration = (request: DurationCreateRequest) => {
    dispatch(createDuration(request));
  };

  if (loading) {
    return <Loader />;
  }
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
                  initialOptions={getDurationsInHoursAndMinutes(
                    durations.filter((duration) =>
                      duration.serviceIds.includes(service.id.toString())
                    )
                  )}
                  onSuccess={handlePatchDurations}
                  options={getDurationsInHoursAndMinutes(durations)}
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
