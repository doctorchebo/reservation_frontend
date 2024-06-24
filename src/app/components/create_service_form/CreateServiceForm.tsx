import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllAddressesByBusinessId } from "@/app/store/address/addressActions";
import { getAllDurationsByBusinessId } from "@/app/store/duration/durationActions";
import { IOption } from "@/app/types/option";
import { ServiceCreateRequest } from "@/app/types/serviceType";
import { getDurations } from "@/app/utils/getDurations";
import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../button/Button";
import RowInput from "../row_input/RowInput";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import styles from "./createServiceForm.module.css";

interface CreateServiceFormProps {
  onSuccess: (value: ServiceCreateRequest) => void;
}

const CreateServiceForm: React.FC<CreateServiceFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const [visible, setVisible] = useState(false);
  const { business } = useAppSelector((state) => state.business);
  const { durations } = useAppSelector((state) => state.duration);
  const { addresses } = useAppSelector((state) => state.address);
  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    if (business) {
      dispatch(getAllAddressesByBusinessId(business.id));
      dispatch(getAllDurationsByBusinessId(business.id));
    }
  }, [business]);

  const [newService, setNewService] = useState({
    name: "",
    price: 0,
    addresses: [] as IOption[],
    durations: [] as IOption[],
  });

  const handleSuccess = () => {
    if (business) {
      onSuccess({
        addressIds: newService.addresses.map((address) => {
          return address.id;
        }),
        durationIds: newService.durations.map((duration) => {
          return duration.id;
        }),
        name: newService.name,
        price: newService.price,
        businessId: business.id,
      } as ServiceCreateRequest);
      setVisible(false);
    }
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | IOption[],
    optionName?: string | undefined
  ) => {
    if (Array.isArray(e)) {
      let name = optionName!;
      setNewService((prev) => ({
        ...prev,
        [name]: e,
      }));
    } else {
      console.log(e, optionName);
      const { value } = e.target;
      setNewService((prev) => ({
        ...prev,
        [optionName!]: value,
      }));
    }
  };
  return (
    addresses &&
    durations && (
      <div className={styles.container}>
        {visible ? (
          <>
            <div className={styles.createForm}>
              <table>
                <tbody>
                  <RowInput
                    name="name"
                    title="Nombre"
                    value={newService.name}
                    createMode={true}
                    onChange={handleOnChange}
                  />
                  <RowInput
                    name="price"
                    title="Precio"
                    value={newService.price}
                    createMode={true}
                    onChange={handleOnChange}
                  />
                  <RowMultiselect
                    name="durations"
                    title="Duraciones"
                    value={newService.durations}
                    options={getDurations(durations, { type: "minutes" })}
                    createMode={true}
                    onChange={handleOnChange}
                  />
                  <RowMultiselect
                    name="addresses"
                    title="Direcciones"
                    value={newService.addresses}
                    options={addresses.map((address) => {
                      return {
                        id: address.id,
                        name: address.name,
                      } as IOption;
                    })}
                    createMode={true}
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
              Crear Servicio
            </Button>
          </div>
        )}
      </div>
    )
  );
};

export default CreateServiceForm;
