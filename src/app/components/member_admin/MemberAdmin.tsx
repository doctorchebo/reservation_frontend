import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  patchMemberFirstName,
  patchMemberLastName,
} from "@/app/store/member/memberActions";
import {
  PatchMemberFirstNameRequest,
  PatchMemberLastNameRequest,
} from "@/app/types/memberType";
import RowInput from "../row_input/RowInput";
import Typography from "../typography/Typography";
import styles from "./memberAdmin.module.css";
const MemberAdmin = () => {
  const dispatch = useAppDispatch();
  const { member } = useAppSelector((state) => state.member);
  const handlePatchFirstName = (firstName: string) => {
    if (member) {
      dispatch(
        patchMemberFirstName({
          memberId: member.id,
          firstName: firstName,
        } as PatchMemberFirstNameRequest)
      );
    }
  };
  const handlePatchLastName = (lastName: string) => {
    if (member) {
      dispatch(
        patchMemberLastName({
          memberId: member.id,
          lastName: lastName,
        } as PatchMemberLastNameRequest)
      );
    }
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
                title="Nombre:"
                initialValue={member.firstName}
                onSuccess={handlePatchFirstName}
              />
              <RowInput
                title="Apellido:"
                initialValue={member.lastName}
                onSuccess={handlePatchLastName}
              />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MemberAdmin;
