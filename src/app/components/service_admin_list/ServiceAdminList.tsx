import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllAddressesByBusinessId } from "@/app/store/address/addressActions";
import { patchBusinessServices } from "@/app/store/business/businessActions";
import { getAllPricesByBusinessId } from "@/app/store/price/priceActions";
import {
  getAvailableServicesByBusinessId,
  patchServiceAddresses,
  patchServiceName,
  patchServicePrice,
} from "@/app/store/service/serviceActions";
import { Address } from "@/app/types/addressType";
import { BusinessPatchServicesRequest } from "@/app/types/businessType";
import { IOption } from "@/app/types/option";
import {
  ServicePatchAddressesRequest,
  ServicePatchNameRequest,
  ServicePatchPriceRequest,
} from "@/app/types/serviceType";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import RowInput from "../row_input/RowInput";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import RowTitle from "../row_title/RowTitle";
import Typography from "../typography/Typography";
const ServiceAdminList = () => {
  const dispatch = useAppDispatch();
  const { business } = useAppSelector((state) => state.business);
  const { services } = useAppSelector((state) => state.service);
  const { addresses } = useAppSelector((state) => state.address);
  const { prices } = useAppSelector((state) => state.price);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [business, dispatch]);

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
    name: string | number,
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
    price: string | number,
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    business && (
      <>
        <Typography color="dark" size="large">
          Servicios
        </Typography>
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
            {services.map((service, index) => {
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
                    title="Nombre:"
                  />
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
                    title="Direcciones:"
                  />
                  <RowInput
                    key={`${service.id}-price`}
                    id={service.id}
                    initialValue={
                      prices.filter(
                        (price) =>
                          price.businessId === business.id &&
                          price.serviceId === service.id.toString()
                      )[0].price
                    }
                    onSuccess={handlePatchServicePrice}
                    title="Precio:"
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
