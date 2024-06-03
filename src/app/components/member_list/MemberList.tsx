"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getMembers } from "@/app/store/member/memberActions";
import { setMemberId } from "@/app/store/member/memberSlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./memberList.module.css";
interface MemberListProps {
  businessId: number;
}
const MemberList: React.FC<MemberListProps> = ({ businessId }) => {
  const dispatch = useAppDispatch();
  const [currentMemberId, setCurrentMemberId] = useState("");

  const { members, memberId } = useAppSelector((state) => state.member);
  useEffect(() => {
    dispatch(getMembers(businessId));
  }, []);

  useEffect(() => {
    if (memberId) {
      setCurrentMemberId(memberId);
    }
  }, [memberId]);

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(setMemberId(e.target.value as string));
  };

  return (
    <div className={styles.container}>
      <FormControl fullWidth>
        <InputLabel>Miembro</InputLabel>
        <Select
          defaultValue={currentMemberId}
          value={currentMemberId}
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
  );
};

export default MemberList;
