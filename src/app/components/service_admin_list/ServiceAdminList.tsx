import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllAddressesByBusinessId } from "@/app/store/address/addressActions";
import { patchBusinessServices } from "@/app/store/business/businessActions";
import { getAllPricesByBusinessId } from "@/app/store/price/priceActions";
import {
  createService,
  deleteService,
  getAvailableServicesByBusinessId,
  patchServiceAddresses,
  patchServiceName,
  patchServicePrice,
} from "@/app/store/service/serviceActions";
import { setSuccess } from "@/app/store/service/serviceSlice";
import { Address } from "@/app/types/addressType";
import { BusinessPatchServicesRequest } from "@/app/types/businessType";
import { IOption } from "@/app/types/option";
import {
  ServiceCreateRequest,
  ServicePatchAddressesRequest,
  ServicePatchNameRequest,
  ServicePatchPriceRequest,
} from "@/app/types/serviceType";
import { createToast } from "@/app/utils/createToast";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from "../confirmation_dialog/ConfirmationDialog";
import CreateServiceForm from "../create_service_form/CreateServiceForm";
import Loader from "../loader/Loader";
import RowButton from "../row_button/RowButton";
import RowInput from "../row_input/RowInput";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import RowTitle from "../row_title/RowTitle";
import Typography from "../typography/Typography";
const ServiceAdminList = () => {
  const dispatch = useAppDispatch();
  const { business } = useAppSelector((state) => state.business);
  const { services, success } = useAppSelector((state) => state.service);
  const { addresses } = useAppSelector((state) => state.address);
  const { prices } = useAppSelector((state) => state.price);
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (success) {
      createToast("Éxito!", "success", 3000);
      dispatch(setSuccess(false));
    }
  }, [success]);

  useEffect(() => {
    const fetchData = async () => {
      if (business) {
        await dispatch(getAvailableServicesByBusinessId(business.id));
        await dispatch(getAllAddressesByBusinessId(business.id));
        await dispatch(getAllPricesByBusinessId(business.id));
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (business) {
      dispatch(getAllPricesByBusinessId(business.id));
      dispatch(getAllAddressesByBusinessId(business.id));
    }
  }, [services]);

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

  const handleServicePatchName = (
    name: string | number | undefined,
    id: number | undefined
  ) => {
    id &&
      dispatch(
        patchServiceName({
          name: name,
          serviceId: id.toString(),
        } as ServicePatchNameRequest)
      );
  };

  const handlePatchServiceAddresses = (
    options: IOption[],
    id?: string | number | undefined
  ) => {
    id &&
      dispatch(
        patchServiceAddresses({
          serviceId: id.toString(),
          addressIds: options.map((o) => o.id),
        } as ServicePatchAddressesRequest)
      );
  };

  const handlePatchServicePrice = (
    price: string | number | undefined,
    id: number | undefined
  ) => {
    id &&
      business &&
      dispatch(
        patchServicePrice({
          businessId: business.id,
          serviceId: id.toString(),
          price: price,
        } as ServicePatchPriceRequest)
      );
  };

  const getOptions = (addresses: Address[]) => {
    return addresses.map((address) => {
      return {
        id: address.id,
        name: address.name,
      } as IOption;
    });
  };

  const getServicePrice = (serviceId: string | number) => {
    const price = prices.find(
      (price) =>
        price.businessId === business!.id &&
        price.serviceId === serviceId.toString()
    );
    return price ? price.price : "";
  };

  const handleCreateService = (request: ServiceCreateRequest) => {
    dispatch(createService(request));
  };

  const handleOpenModal = (serviceId: string | number | undefined) => {
    setSelectedId(serviceId as number);
    setOpenModal(true);
  };

  const handleDeleteService = () => {
    selectedId && dispatch(deleteService(selectedId));
    setOpenModal(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    business && (
      <>
        <ConfirmationDialog
          cancelText="Cancelar"
          onCancel={() => setOpenModal(false)}
          onSuccess={handleDeleteService}
          open={openModal}
          successText="Eliminar"
          title="Eliminar servicio"
          content="¿Estás seguro de eliminar el servicio?"
        />
        <Typography color="dark" size="large">
          Servicios
        </Typography>
        <CreateServiceForm onSuccess={handleCreateService} />
        <table>
          <tbody>
            <RowMultiselect
              title="Servicios disponibles"
              initialOptions={business.services
                .filter((service) => service.businessId === business.id)
                .map((service) => {
                  return { id: service.id, name: service.name } as IOption;
                })}
              onSuccess={handlePatchServices}
              options={services.map((service) => {
                return { id: service.id, name: service.name } as IOption;
              })}
            />
            {services &&
              services.map((service) => {
                return (
                  <React.Fragment key={service.id}>
                    <RowTitle
                      key={`${service.id}-title`}
                      title={service.name}
                      colspan={3}
                      color="dark"
                      size="medium"
                    />
                    <RowInput
                      key={`${service.id}-name`}
                      id={service.id}
                      initialValue={service.name}
                      onSuccess={handleServicePatchName}
                      title="Nombre"
                    />
                    {addresses && (
                      <RowMultiselect
                        key={`${service.id}-addresses`}
                        id={service.id}
                        initialOptions={getOptions(
                          addresses.filter((address) =>
                            service.addressIds.includes(address.id)
                          )
                        )}
                        onSuccess={handlePatchServiceAddresses}
                        options={getOptions(addresses)}
                        title="Direcciones"
                      />
                    )}
                    <RowInput
                      key={`${service.id}-price`}
                      id={service.id}
                      initialValue={getServicePrice(service.id)}
                      onSuccess={handlePatchServicePrice}
                      title="Precio"
                    />
                    <RowButton
                      onClick={handleOpenModal}
                      title="Eliminar"
                      id={service.id}
                      type="cancel"
                    />
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </>
    )
  );
};

export default ServiceAdminList;
