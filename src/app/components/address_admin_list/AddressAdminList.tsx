import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  getAllAddressesByBusinessId,
  patchAddressIsMainAddress,
  patchAddressLatitude,
  patchAddressLongitude,
  patchAddressName,
} from "@/app/store/address/addressActions";
import {
  AddressPatchIsMainAddressRequest,
  AddressPatchLatitudeRequest,
  AddressPatchLongitudeRequest,
  AddressPatchNameRequest,
} from "@/app/types/addressType";
import { IOption } from "@/app/types/option";
import React, { useEffect } from "react";
import RowDropdown from "../row_dropdown/RowDropdown";
import RowInput from "../row_input/RowInput";
import RowTitle from "../row_title/RowTitle";
import Typography from "../typography/Typography";
const AddressAdminList = () => {
  const dispatch = useAppDispatch();
  const { business } = useAppSelector((state) => state.business);
  const { addresses } = useAppSelector((state) => state.address);
  useEffect(() => {
    if (business) {
      dispatch(getAllAddressesByBusinessId(business.id));
    }
  }, [business]);

  const handlePatchAddressName = (
    name: string | number,
    addressId: number | undefined
  ) => {
    dispatch(patchAddressName({ addressId, name } as AddressPatchNameRequest));
  };
  const handlePatchLatitude = (
    value: string | number,
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
    value: string | number,
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
          Direcciones
        </Typography>
        <table>
          <tbody>
            <RowDropdown
              key="main-address"
              title="Dirección principal:"
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
                    title={`Dirección ${index + 1}`}
                    color="dark"
                    key={`${address.id}-title`}
                    size="medium"
                  />
                  <RowInput
                    key={`${address.id}-name`}
                    id={address.id}
                    initialValue={address.name}
                    title="Dirección:"
                    onSuccess={handlePatchAddressName}
                  />
                  <RowInput
                    key={`${address.id}-latitude`}
                    id={address.id}
                    initialValue={address.geolocation.latitude}
                    title="Latitud:"
                    onSuccess={handlePatchLatitude}
                  />
                  <RowInput
                    key={`${address.id}-longitude`}
                    id={address.id}
                    initialValue={address.geolocation.longitude}
                    title="Longitud:"
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
