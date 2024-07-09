import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllAddressesByBusinessId } from "@/app/store/address/addressActions";
import {
  patchMemberAddress,
  patchMemberFirstName,
  patchMemberLastName,
} from "@/app/store/member/memberActions";
import { setSuccess } from "@/app/store/member/memberSlice";
import {
  MemberPatchAddressRequest,
  MemberPatchFirstNameRequest,
  MemberPatchLastNameRequest,
} from "@/app/types/memberType";
import { IOption } from "@/app/types/option";
import { createToast } from "@/app/utils/createToast";
import { useEffect } from "react";
import RowDropdown from "../row_dropdown/RowDropdown";
import RowInput from "../row_input/RowInput";
import Typography from "../typography/Typography";
import styles from "./memberAdmin.module.css";
const MemberAdmin = () => {
  const dispatch = useAppDispatch();
  const { member, success } = useAppSelector((state) => state.member);
  const { addresses } = useAppSelector((state) => state.address);
  useEffect(() => {
    if (member) {
      dispatch(getAllAddressesByBusinessId(member.businessId));
    }
  }, [member]);

  useEffect(() => {
    if (success) {
      createToast("Éxito!", "success", 3000);
      dispatch(setSuccess(false));
    }
  }, [success]);

  const handlePatchFirstName = (
    firstName: string | number | undefined,
    id: number | string | undefined
  ) => {
    if (member) {
      dispatch(
        patchMemberFirstName({
          memberId: member.id,
          firstName: firstName,
        } as MemberPatchFirstNameRequest)
      );
    }
  };
  const handlePatchLastName = (
    lastName: string | number | undefined,
    id: number | string | undefined
  ) => {
    if (member) {
      dispatch(
        patchMemberLastName({
          memberId: member.id,
          lastName: lastName,
        } as MemberPatchLastNameRequest)
      );
    }
  };

  const handlePatchMemberAddress = (addressId: number | string) => {
    member &&
      dispatch(
        patchMemberAddress({
          memberId: member.id,
          addressId: addressId,
        } as MemberPatchAddressRequest)
      );
  };
  return (
    <div className={styles.container}>
      {member && (
        <>
          <Typography size="large" color="dark">
            Datos básicos
          </Typography>
          <table className={styles.table}>
            <tbody>
              <RowInput
                title="Nombre"
                initialValue={member.firstName}
                onSuccess={handlePatchFirstName}
              />
              <RowInput
                title="Apellido"
                initialValue={member.lastName}
                onSuccess={handlePatchLastName}
              />
              <RowDropdown
                title="Sucursal actual"
                initialSelected={member.addressId}
                onSuccess={handlePatchMemberAddress}
                options={addresses.map((address) => {
                  return { id: address.id, name: address.name } as IOption;
                })}
              />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MemberAdmin;
