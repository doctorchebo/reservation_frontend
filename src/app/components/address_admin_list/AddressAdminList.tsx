import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  getAllAddressesByBusinessId,
  patchAddressIsMainAddress,
  patchAddressLatitude,
  patchAddressLongitude,
  patchAddressName,
} from "@/app/store/address/addressActions";
import { setSuccess } from "@/app/store/address/addressSlice";
import {
  AddressPatchIsMainAddressRequest,
  AddressPatchLatitudeRequest,
  AddressPatchLongitudeRequest,
  AddressPatchNameRequest,
} from "@/app/types/addressType";
import { IOption } from "@/app/types/option";
import { createToast } from "@/app/utils/createToast";
import React, { useEffect } from "react";
import RowDropdown from "../row_dropdown/RowDropdown";
import RowInput from "../row_input/RowInput";
import RowTitle from "../row_title/RowTitle";
import Typography from "../typography/Typography";
const AddressAdminList = () => {
  const dispatch = useAppDispatch();
  const { business } = useAppSelector((state) => state.business);
  const { addresses, success } = useAppSelector((state) => state.address);

  useEffect(() => {
    if (success) {
      createToast("Éxito!", "success", 3000);
      dispatch(setSuccess(false));
    }
  }, [success]);

  useEffect(() => {
    if (business) {
      dispatch(getAllAddressesByBusinessId(business.id));
    }
  }, [business]);

  const handlePatchAddressName = (
    name: string | number | undefined,
    addressId: number | undefined
  ) => {
    dispatch(patchAddressName({ addressId, name } as AddressPatchNameRequest));
  };
  const handlePatchLatitude = (
    value: string | number | undefined,
    id: number | undefined
  ) => {
    dispatch(
      patchAddressLatitude({
        addressId: id,
        latitude: value,
      } as AddressPatchLatitudeRequest)
    );
  };
  const handlePatchLongitude = (
    value: string | number | undefined,
    id: number | undefined
  ) => {
    dispatch(
      patchAddressLongitude({
        addressId: id,
        longitude: value,
      } as AddressPatchLongitudeRequest)
    );
  };
  const handlePatchIsMainAddress = (addressId: number) => {
    if (business) {
      dispatch(
        patchAddressIsMainAddress({
          addressId: addressId,
          businessId: business.id,
        } as AddressPatchIsMainAddressRequest)
      );
    }
  };

  return (
    addresses &&
    business && (
      <>
        <Typography size="large" color="dark">
          Sucursales
        </Typography>
        <table>
          <tbody>
            <RowDropdown
              key="main-address"
              title="Sucursal principal"
              initialSelected={
                addresses.find((address) => address.isMainAddress)?.id!
              }
              onSuccess={handlePatchIsMainAddress}
              options={addresses.map((address) => {
                return { id: address.id, name: address.name } as IOption;
              })}
            />
            {addresses.map((address, index) => {
              return (
                <React.Fragment key={address.id}>
                  <RowTitle
                    colspan={3}
                    title={`Sucursal ${index + 1}`}
                    color="dark"
                    key={`${address.id}-title`}
                    size="medium"
                  />
                  <RowInput
                    key={`${address.id}-name`}
                    id={address.id}
                    initialValue={address.name}
                    title="Dirección"
                    onSuccess={handlePatchAddressName}
                  />
                  <RowInput
                    key={`${address.id}-latitude`}
                    id={address.id}
                    initialValue={address.geolocation.latitude}
                    title="Latitud"
                    onSuccess={handlePatchLatitude}
                  />
                  <RowInput
                    key={`${address.id}-longitude`}
                    id={address.id}
                    initialValue={address.geolocation.longitude}
                    title="Longitud"
                    onSuccess={handlePatchLongitude}
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

export default AddressAdminList;
