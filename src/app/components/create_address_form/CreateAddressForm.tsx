import { ChangeEvent, useState } from "react";

import { useAppSelector } from "@/app/hooks/hooks";
import { AddressCreateRequest } from "@/app/types/addressType";
import { IOption } from "@/app/types/option";
import { handleOnChangeGeneric } from "@/app/utils/handleOnChangeGeneric";
import { SelectChangeEvent } from "@mui/material";
import Button from "../button/Button";
import RowCheckbox from "../row_checkbox/RowCheckbox";
import RowInput from "../row_input/RowInput";
import styles from "./createAddressForm.module.css";

interface CreateAddressForm {
  onSuccess: (value: AddressCreateRequest) => void;
}
const CreateAddressForm: React.FC<CreateAddressForm> = ({ onSuccess }) => {
  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  };
  const { business } = useAppSelector((state) => state.business);

  const [newAddress, setNewAddress] = useState({
    businessId: 1,
    name: "",
    longitude: -68.13347641526038,
    latitude: -16.495679053868184,
    isMainAddress: true,
  });

  const handleSuccess = () => {
    if (business) {
      onSuccess({
        businessId: business.id,
        name: newAddress.name,
        longitude: newAddress.longitude,
        latitude: newAddress.latitude,
        isMainAddress: newAddress.isMainAddress,
      } as AddressCreateRequest);
      setVisible(false);
    }
  };

  const handleOnChange = (
    e:
      | SelectChangeEvent<number | string>
      | ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | IOption[]
      | boolean
      | number,
    optionName?: string | undefined
  ) => {
    handleOnChangeGeneric(e, setNewAddress, optionName);
  };
  return (
    <div className={styles.container}>
      {visible ? (
        <>
          <div className={styles.createForm}>
            <table>
              <tbody>
                <RowInput
                  name="name"
                  title="Nombre"
                  value={newAddress.name}
                  createMode={true}
                  onChange={handleOnChange}
                />
                <RowInput
                  name="latitude"
                  title="Latitud"
                  value={newAddress.latitude}
                  createMode={true}
                  onChange={handleOnChange}
                />
                <RowInput
                  name="longitude"
                  title="Longitud"
                  value={newAddress.longitude}
                  createMode={true}
                  onChange={handleOnChange}
                />
                <RowCheckbox
                  name="isMainAddress"
                  createMode={true}
                  title="Activo"
                  value={newAddress.isMainAddress}
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
            Crear Sucursal
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateAddressForm;
