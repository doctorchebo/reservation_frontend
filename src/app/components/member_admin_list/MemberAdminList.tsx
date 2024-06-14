import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { patchBusinessActiveMembers } from "@/app/store/business/businessActions";
import { getMembers } from "@/app/store/member/memberActions";
import { BusinessPatchMembersRequest } from "@/app/types/businessType";
import { IOption } from "@/app/types/option";
import { useEffect } from "react";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import Typography from "../typography/Typography";
const MemberAdminList = () => {
  const dispatch = useAppDispatch();
  const { members } = useAppSelector((state) => state.member);
  const { business } = useAppSelector((state) => state.business);
  useEffect(() => {
    if (business) {
      dispatch(getMembers(business.id));
    }
  }, [business]);

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

  return (
    business && (
      <>
        <Typography size="large" color="dark">
          Configuraciones avanzadas
        </Typography>
        <table>
          <tbody>
            <RowMultiselect
              title="Miembros activos"
              initialOptions={business.members
                .filter((member) => member.isActive)
                .map((member) => {
                  return {
                    id: member.id,
                    name: `${member.firstName} ${member.lastName}`,
                  } as IOption;
                })}
              options={members.map((member) => {
                return {
                  id: member.id,
                  name: `${member.firstName} ${member.lastName}`,
                } as IOption;
              })}
              onSuccess={handlePatchActiveMembers}
            />
          </tbody>
        </table>
      </>
    )
  );
};

export default MemberAdminList;
