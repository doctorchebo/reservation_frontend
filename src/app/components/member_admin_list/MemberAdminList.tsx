import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { patchBusinessActiveMembers } from "@/app/store/business/businessActions";
import { setSuccess } from "@/app/store/business/businessSlice";
import {
  createMember,
  deleteMember,
  getAllMembersByBusinessId,
  patchMemberAddress,
  patchMemberFirstName,
  patchMemberIsActive,
  patchMemberLastName,
  patchMemberPhoneNumber,
  patchMemberTitle,
} from "@/app/store/member/memberActions";
import { Address } from "@/app/types/addressType";
import { BusinessPatchMembersRequest } from "@/app/types/businessType";
import {
  Member,
  MemberCreateRequest,
  MemberPatchAddressRequest,
  MemberPatchFirstNameRequest,
  MemberPatchIsActiveRequest,
  MemberPatchLastNameRequest,
  MemberPatchPhoneNumberRequest,
  MemberPatchTitleRequest,
} from "@/app/types/memberType";
import { IOption } from "@/app/types/option";
import { createToast } from "@/app/utils/createToast";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from "../confirmation_dialog/ConfirmationDialog";
import CreateMemberForm from "../create_member_form/CreateMemberForm";
import RowButton from "../row_button/RowButton";
import RowCheckbox from "../row_checkbox/RowCheckbox";
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
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (business) {
      dispatch(getAllMembersByBusinessId(business.id));
    }
  }, [business]);

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

  const handlePatchMemberIsActive = (
    isActive: boolean,
    memberId?: number | undefined
  ) => {
    memberId &&
      dispatch(
        patchMemberIsActive({
          memberId: memberId,
          isActive: isActive,
        } as MemberPatchIsActiveRequest)
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

  const handleCreateMember = (request: MemberCreateRequest) => {
    dispatch(createMember(request));
  };

  const handleOpenModal = (serviceId: string | number | undefined) => {
    setSelectedId(serviceId as number);
    setOpenModal(true);
  };

  const handleDeleteMember = () => {
    selectedId && dispatch(deleteMember(selectedId));
    setOpenModal(false);
  };

  return (
    business &&
    members &&
    addresses && (
      <>
        <ConfirmationDialog
          cancelText="Cancelar"
          onCancel={() => setOpenModal(false)}
          onSuccess={handleDeleteMember}
          open={openModal}
          successText="Eliminar"
          title="Eliminar Miembro"
          content="¿Estás seguro de eliminar al miembro? Las reservas asociadas no tendrán a ningún miembro asociado"
        />
        <Typography size="large" color="dark">
          Miembros
        </Typography>
        <CreateMemberForm onSuccess={handleCreateMember} />
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
            {members.map((member, index) => {
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
                    title="Sucursal"
                  />
                  <RowCheckbox
                    initialValue={member.isActive}
                    id={member.id}
                    key={`${member.id}-isActive`}
                    onSuccess={handlePatchMemberIsActive}
                    title="Activo"
                  />
                  <RowButton
                    onClick={handleOpenModal}
                    title="Eliminar"
                    id={member.id}
                    type="cancel"
                  />
                  {/* <RowMultiselect
                    key={`${member.calendar.id}-schedules`}
                    id={member.calendar.id}
                    initialOptions={getOptions(
                      addresses.filter((address) =>
                        service.addressIds.includes(address.id)
                      )
                    )}
                    onSuccess={handlePatchMemberSchedules}
                    options={getOptions(addresses)}
                    title="Horarios"
                  /> */}
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
