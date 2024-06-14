import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  getAllAddressesByBusinessId,
  patchAddressLatitude,
  patchAddressLongitude,
  patchAddressName,
} from "@/app/store/address/addressActions";
import {
  AddressPatchLatitudeRequest,
  AddressPatchLongitudeRequest,
  AddressPatchNameRequest,
} from "@/app/types/addressType";
import { useEffect } from "react";
import RowInput from "../row_input/RowInput";
import Typography from "../typography/Typography";
import styles from "./addressAdminList.module.css";
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
  const handlePatchIsMainAddress = () => {};
  return (
    addresses && (
      <>
        <Typography size="large" color="dark">
          Direcciones
        </Typography>
        <table>
          <tbody>
            {addresses.map((address) => {
              return (
                <>
                  <RowInput
                    id={address.id}
                    initialValue={address.name}
                    title="Dirección:"
                    onSuccess={handlePatchAddressName}
                  />
                  <RowInput
                    id={address.id}
                    initialValue={address.geolocation.latitude}
                    title="Latitud:"
                    onSuccess={handlePatchLatitude}
                  />
                  <RowInput
                    id={address.id}
                    initialValue={address.geolocation.longitude}
                    title="Longitud:"
                    onSuccess={handlePatchLongitude}
                  />
                  {/* <RowInput
                    initialValue={address.isMainAddress}
                    title="Dirección principal:"
                    onSuccess={handlePatchIsMainAddress}
                  /> */}
                </>
              );
            })}
          </tbody>
        </table>
      </>
    )
  );
};

export default AddressAdminList;
