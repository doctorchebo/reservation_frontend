import { ChangeEvent, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllAddressesByBusinessId } from "@/app/store/address/addressActions";
import { getAllUsers } from "@/app/store/user/userActions";
import { MemberCreateRequest } from "@/app/types/memberType";
import { IOption } from "@/app/types/option";
import { handleOnChangeGeneric } from "@/app/utils/handleOnChangeGeneric";
import { SelectChangeEvent } from "@mui/material";
import Button from "../button/Button";
import RowCheckbox from "../row_checkbox/RowCheckbox";
import RowDropdown from "../row_dropdown/RowDropdown";
import RowInput from "../row_input/RowInput";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import styles from "./createMemberForm.module.css";

interface CreateMemberFormProps {
  onSuccess: (value: MemberCreateRequest) => void;
}
const CreateMemberForm: React.FC<CreateMemberFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  };
  const { addresses } = useAppSelector((state) => state.address);
  const { business } = useAppSelector((state) => state.business);
  useEffect(() => {
    if (business) {
      dispatch(getAllAddressesByBusinessId(business.id));
      dispatch(getAllUsers());
    }
  }, [business]);

  const [member, setMember] = useState({
    userId: undefined,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    title: "",
    address: [] as IOption[],
    isEnabled: true,
  });
  const handleSuccess = () => {
    if (business) {
      onSuccess({
        businessId: business.id,
        userId: member.userId,
        firstName: member.firstName,
        lastName: member.lastName,
        phoneNumber: member.phoneNumber,
        title: member.title,
        addressId: member.address[0].id,
        isEnabled: member.isEnabled,
      } as MemberCreateRequest);
      setVisible(false);
    }
  };

  const handleOnChange = (
    e:
      | SelectChangeEvent<number | string>
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | IOption[]
      | boolean
      | number
      | SelectChangeEvent<number | string>,
    optionName?: string | undefined
  ) => {
    handleOnChangeGeneric(e, setMember, optionName);
  };
  return (
    <div className={styles.container}>
      {visible ? (
        <>
          <div className={styles.createForm}>
            <table>
              <tbody>
                <RowDropdown
                  name="userId"
                  value={member.userId}
                  options={users.map((user) => {
                    return { id: user.id, name: user.username } as IOption;
                  })}
                  title="Usuario"
                  onChange={handleOnChange}
                  createMode={true}
                />
                <RowInput
                  name="firstName"
                  title="Nombres"
                  value={member.firstName}
                  createMode={true}
                  onChange={handleOnChange}
                />
                <RowInput
                  name="lastName"
                  title="Apellidos"
                  value={member.lastName}
                  createMode={true}
                  onChange={handleOnChange}
                />
                <RowInput
                  name="phoneNumber"
                  title="Teléfono"
                  value={member.phoneNumber}
                  createMode={true}
                  onChange={handleOnChange}
                />
                <RowInput
                  name="title"
                  title="Título"
                  value={member.title}
                  createMode={true}
                  onChange={handleOnChange}
                />
                <RowMultiselect
                  name="address"
                  title="Sucursal"
                  value={member.address}
                  options={addresses.map((address) => {
                    return { id: address.id, name: address.name } as IOption;
                  })}
                  createMode={true}
                  onChange={handleOnChange}
                />
                <RowCheckbox
                  name="isEnabled"
                  initialValue
                  createMode={true}
                  title="Activo"
                  value={member.isEnabled}
                  onChange={handleOnChange}
                />
              </tbody>
            </table>
          </div>
          <div className={styles.actionButtons}>
            <Button onClick={handleSuccess}>Guardar</Button>
            <Button type="cancel" onClick={handleCancel}>
              Cancelar
            </Button>
          </div>
        </>
      ) : (
        <div className={styles.btn}>
          <Button onClick={() => setVisible(true)} type="success">
            Crear Miembro
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateMemberForm;
