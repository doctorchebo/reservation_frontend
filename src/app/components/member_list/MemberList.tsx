"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setMemberId } from "@/app/store/member/memberSlice";
import { Member } from "@/app/types/memberType";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styles from "./memberList.module.css";
interface MemberListProps {
  members: Member[];
}
const MemberList: React.FC<MemberListProps> = ({ members }) => {
  const dispatch = useAppDispatch();
  const { memberId } = useAppSelector((state) => state.member);
  const handleChange = (e: SelectChangeEvent) => {
    dispatch(setMemberId(e.target.value as string));
  };

  return (
    members && (
      <div className={styles.container}>
        <FormControl fullWidth>
          <InputLabel>Miembro</InputLabel>
          <Select
            defaultValue={memberId || ""}
            value={memberId || ""}
            label="Member"
            onChange={handleChange}
          >
            {members.map((member) => {
              return (
                <MenuItem key={member.id} value={member.id}>
                  {member.firstName} {member.lastName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    )
  );
};

export default MemberList;
