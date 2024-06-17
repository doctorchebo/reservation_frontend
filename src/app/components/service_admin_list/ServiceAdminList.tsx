import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { patchBusinessServices } from "@/app/store/business/businessActions";
import { getAvailableServicesByBusinessId } from "@/app/store/service/serviceActions";
import { BusinessPatchServicesRequest } from "@/app/types/businessType";
import { IOption } from "@/app/types/option";
import { useEffect } from "react";
import RowMultiselect from "../row_multiselect/RowMultiselect";

const ServiceAdminList = () => {
  const dispatch = useAppDispatch();
  const { business } = useAppSelector((state) => state.business);
  const { services } = useAppSelector((state) => state.service);

  useEffect(() => {
    business && dispatch(getAvailableServicesByBusinessId(business.id));
  }, [business]);

  const handlePatchServices = (services: IOption[]) => {
    business &&
      dispatch(
        patchBusinessServices({
          businessId: business.id,
          serviceIds: services.map((s) => {
            return s.id;
          }),
        } as BusinessPatchServicesRequest)
      );
  };
  return (
    services &&
    business && (
      <table>
        <tbody>
          <RowMultiselect
            title="Servicios disponibles:"
            initialOptions={business.services
              .filter((service) => service.businessIds.includes(business.id))
              .map((service) => {
                return { id: service.id, name: service.name } as IOption;
              })}
            onSuccess={handlePatchServices}
            options={services.map((service) => {
              return { id: service.id, name: service.name } as IOption;
            })}
          />
        </tbody>
      </table>
    )
  );
};

export default ServiceAdminList;
