import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { patchBusinessActiveMembers } from "@/app/store/business/businessActions";
import { setSuccess } from "@/app/store/business/businessSlice";
import {
  patchMemberAddress,
  patchMemberFirstName,
  patchMemberLastName,
  patchMemberPhoneNumber,
  patchMemberTitle,
} from "@/app/store/member/memberActions";
import { Address } from "@/app/types/addressType";
import { BusinessPatchMembersRequest } from "@/app/types/businessType";
import {
  Member,
  MemberPatchAddressRequest,
  MemberPatchFirstNameRequest,
  MemberPatchLastNameRequest,
  MemberPatchPhoneNumberRequest,
  MemberPatchTitleRequest,
} from "@/app/types/memberType";
import { IOption } from "@/app/types/option";
import { createToast } from "@/app/utils/createToast";
import React, { useEffect } from "react";
import RowDropdown from "../row_dropdown/RowDropdown";
import RowInput from "../row_input/RowInput";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import RowTitle from "../row_title/RowTitle";
import Typography from "../typography/Typography";
const MemberAdminList = () => {
  const dispatch = useAppDispatch();
  const { members, success } = useAppSelector((state) => state.member);
  const { business } = useAppSelector((state) => state.business);
  const { addresses } = useAppSelector((state) => state.address);

  useEffect(() => {
    if (success) {
      createToast("Éxito!", "success", 3000);
      dispatch(setSuccess(false));
    }
  }, [success]);
  const getOptions = (addresses: Address[]) => {
    return addresses.map((address) => {
      return { id: address.id, name: address.name } as IOption;
    });
  };

  const handlePatchActiveMembers = (options: IOption[]) => {
    if (business) {
      dispatch(
        patchBusinessActiveMembers({
          businessId: business.id,
          memberIds: options.map((m) => m.id),
        } as BusinessPatchMembersRequest)
      );
    }
  };

  const handlePatchMemberFirstName = (
    firstName: string | number | undefined,
    id: number | undefined
  ) => {
    id &&
      dispatch(
        patchMemberFirstName({
          memberId: id,
          firstName: firstName,
        } as MemberPatchFirstNameRequest)
      );
  };

  const handlePatchMemberLastName = (
    lastName: string | number | undefined,
    id: number | undefined
  ) => {
    id &&
      dispatch(
        patchMemberLastName({
          memberId: id,
          lastName: lastName,
        } as MemberPatchLastNameRequest)
      );
  };

  const handlePatchMemberPhoneNumber = (
    phoneNumber: string | number | undefined,
    id: number | undefined
  ) => {
    id &&
      dispatch(
        patchMemberPhoneNumber({
          memberId: id,
          phoneNumber: phoneNumber,
        } as MemberPatchPhoneNumberRequest)
      );
  };

  const handlePatchMemberTitle = (
    title: string | number | undefined,
    id: number | undefined
  ) => {
    id &&
      dispatch(
        patchMemberTitle({
          memberId: id,
          title: title,
        } as MemberPatchTitleRequest)
      );
  };

  const handlePatchMemberAddress = (
    addressId: number,
    id?: string | number | undefined
  ) => {
    id &&
      dispatch(
        patchMemberAddress({
          memberId: id,
          addressId: addressId,
        } as MemberPatchAddressRequest)
      );
  };

  const getMembersFullName = (members: Member[]) => {
    return members.map((member) => {
      return {
        id: member.id,
        name: `${member.firstName} ${member.lastName}`,
      } as IOption;
    });
  };

  return (
    business &&
    members &&
    addresses && (
      <>
        <Typography size="large" color="dark">
          Miembros
        </Typography>
        <table>
          <tbody>
            <RowMultiselect
              title="Miembros activos"
              initialOptions={getMembersFullName(
                business.members.filter((member) => member.isActive)
              )}
              options={getMembersFullName(members)}
              onSuccess={handlePatchActiveMembers}
            />
            {business.members.map((member, index) => {
              return (
                <React.Fragment key={index}>
                  <RowTitle
                    key={`${member.id}-memberTitle`}
                    colspan={3}
                    title={`${member.firstName} ${member.lastName}`}
                    color="dark"
                    size="medium"
                  />
                  <RowInput
                    key={`${member.id}-firstName`}
                    initialValue={member.firstName}
                    onSuccess={handlePatchMemberFirstName}
                    id={member.id}
                    title="Nombres"
                  />
                  <RowInput
                    key={`${member.id}-lastName`}
                    initialValue={member.lastName}
                    onSuccess={handlePatchMemberLastName}
                    id={member.id}
                    title="Apellidos"
                  />
                  <RowInput
                    key={`${member.id}-phoneNumber`}
                    initialValue={member.phoneNumber}
                    onSuccess={handlePatchMemberPhoneNumber}
                    id={member.id}
                    title="Teléfono"
                  />
                  <RowInput
                    key={`${member.id}-title`}
                    initialValue={member.title}
                    onSuccess={handlePatchMemberTitle}
                    id={member.id}
                    title="Título"
                  />
                  <RowDropdown
                    id={member.id}
                    initialSelected={member.addressId}
                    onSuccess={handlePatchMemberAddress}
                    options={getOptions(business.addresses)}
                    key={`${member.id}-address`}
                    title="Dirección"
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

export default MemberAdminList;
