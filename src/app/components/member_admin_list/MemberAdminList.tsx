import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { patchBusinessActiveMembers } from "@/app/store/business/businessActions";
import { getMembers } from "@/app/store/member/memberActions";
import { BusinessPatchMembersRequest } from "@/app/types/businessType";
import { Member } from "@/app/types/memberType";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./memberAdminList.module.css";
const MemberAdminList = () => {
  const dispatch = useAppDispatch();
  const { members } = useAppSelector((state) => state.member);
  const { business, success } = useAppSelector((state) => state.business);
  const [bMembers, setBMembers] = useState<Member[]>([]);
  console.log(JSON.stringify(bMembers));
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    if (business) {
      dispatch(getMembers(business.id));
      setBMembers(business.members.filter((m) => m.isActive));
    }
  }, [business]);

  const handleSaveMembers = () => {
    if (business) {
      dispatch(
        patchBusinessActiveMembers({
          businessId: business.id,
          memberIds: bMembers.map((m) => m.id),
        } as BusinessPatchMembersRequest)
      );
    }
  };

  useEffect(() => {
    if (success) {
      setEdit(false);
    }
  }, [success]);

  return (
    business && (
      <>
        <Typography size="large" color="dark">
          Configuraciones avanzadas
        </Typography>
        <table className={styles.tableContainer}>
          <tbody>
            <tr>
              <td>
                <Typography color="dark" size="medium" align="left">
                  Miembros activos:
                </Typography>
              </td>
              <td>
                {edit ? (
                  <Autocomplete
                    multiple
                    options={members}
                    getOptionLabel={(option) =>
                      `${option.firstName} ${option.lastName}`
                    }
                    value={bMembers}
                    onChange={(event, newValue) => {
                      setBMembers(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder="Miembros"
                      />
                    )}
                  />
                ) : (
                  bMembers.map((member) => {
                    return (
                      <Typography color="dark" size="small" align="left">
                        {member.firstName} {member.lastName}
                      </Typography>
                    );
                  })
                )}
              </td>
              <td>
                <div className={styles.editContainer}>
                  {edit ? (
                    <>
                      <MdCheck
                        color="rgb(62, 128, 70)"
                        onClick={handleSaveMembers}
                      />
                      <MdCancel
                        color="rgb(207, 62, 51)"
                        onClick={() => {
                          setBMembers(business.members);
                          setEdit(false);
                        }}
                      />
                    </>
                  ) : (
                    <MdModeEdit
                      color="rgb(96, 99, 143)"
                      onClick={() => setEdit(true)}
                    />
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    )
  );
};

export default MemberAdminList;
