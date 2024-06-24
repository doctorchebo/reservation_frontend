import { ChangeEvent, useState } from "react";

import { useAppSelector } from "@/app/hooks/hooks";
import { BusinessCreateRequest } from "@/app/types/businessType";
import { IOption } from "@/app/types/option";
import Button from "../button/Button";
import RowInput from "../row_input/RowInput";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import styles from "./createBusinessForm.module.css";

interface CreateBusinessFormProps {
  onSuccess: (value: BusinessCreateRequest) => void;
}
const CreateBusinessForm: React.FC<CreateBusinessFormProps> = ({
  onSuccess,
}) => {
  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  };
  const { categories } = useAppSelector((state) => state.category);
  const { user } = useAppSelector((state) => state.user);
  const [business, setBusiness] = useState<BusinessCreateRequest>({
    name: "",
    categoryIds: [] as number[],
  });
  const handleSuccess = () => {
    onSuccess(business);
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | IOption[]
  ) => {
    if (Array.isArray(e)) {
      setBusiness((prev) => ({
        ...prev,
        categories: e.map((option) => option.id),
      }));
    } else {
      const { value: inputValue, name } = e.target;
      setBusiness((prev) => ({
        ...prev,
        [name]: inputValue,
      }));
    }
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
                  initialValue={""}
                  value={business.name}
                  createMode={true}
                  onChange={handleOnChange}
                />
                <RowMultiselect
                  title="Categorías"
                  options={categories}
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
            Crear Negocio
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateBusinessForm;
