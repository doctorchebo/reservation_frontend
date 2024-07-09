import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  createAddress,
  deleteAddress,
  getAllAddressesByBusinessId,
  patchAddressIsMainAddress,
  patchAddressLatitude,
  patchAddressLongitude,
  patchAddressName,
} from "@/app/store/address/addressActions";
import { setSuccess } from "@/app/store/address/addressSlice";
import {
  AddressCreateRequest,
  AddressPatchIsMainAddressRequest,
  AddressPatchLatitudeRequest,
  AddressPatchLongitudeRequest,
  AddressPatchNameRequest,
} from "@/app/types/addressType";
import { IOption } from "@/app/types/option";
import { createToast } from "@/app/utils/createToast";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from "../confirmation_dialog/ConfirmationDialog";
import CreateAddressForm from "../create_address_form/CreateAddressForm";
import RowButton from "../row_button/RowButton";
import RowDropdown from "../row_dropdown/RowDropdown";
import RowInput from "../row_input/RowInput";
import RowTitle from "../row_title/RowTitle";
import Typography from "../typography/Typography";
const AddressAdminList = () => {
  const dispatch = useAppDispatch();
  const { business } = useAppSelector((state) => state.business);
  const { addresses, success } = useAppSelector((state) => state.address);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

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
    addressId: number | string | undefined
  ) => {
    dispatch(patchAddressName({ addressId, name } as AddressPatchNameRequest));
  };
  const handlePatchLatitude = (
    value: string | number | undefined,
    id: number | string | undefined
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
    id: number | string | undefined
  ) => {
    dispatch(
      patchAddressLongitude({
        addressId: id,
        longitude: value,
      } as AddressPatchLongitudeRequest)
    );
  };
  const handlePatchIsMainAddress = (addressId: number | string) => {
    if (business) {
      dispatch(
        patchAddressIsMainAddress({
          addressId: addressId,
          businessId: business.id,
        } as AddressPatchIsMainAddressRequest)
      );
    }
  };

  const handleCreateAddress = (request: AddressCreateRequest) => {
    dispatch(createAddress(request));
  };

  const handleOpenModal = (serviceId: string | number | undefined) => {
    setSelectedId(serviceId as number);
    setOpenModal(true);
  };

  const handleDeleteAddress = () => {
    selectedId && dispatch(deleteAddress(selectedId));
    setOpenModal(false);
  };

  return (
    addresses &&
    business && (
      <>
        <ConfirmationDialog
          cancelText="Cancelar"
          onCancel={() => setOpenModal(false)}
          onSuccess={handleDeleteAddress}
          open={openModal}
          successText="Eliminar"
          title="Eliminar Sucursal"
          content="¿Estás seguro de eliminar la sucursal? Servicios que contienen sólo esta sucursal tendrán que ser vinculados manualmente con una nueva sucursal"
        />
        <Typography size="large" color="dark">
          Sucursales
        </Typography>
        <CreateAddressForm onSuccess={handleCreateAddress} />
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
                  <RowButton
                    onClick={handleOpenModal}
                    title="Eliminar"
                    id={address.id}
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

export default AddressAdminList;
