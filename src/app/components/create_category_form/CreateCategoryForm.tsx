import { ChangeEvent, useState } from "react";

import { CategoryCreateRequest } from "@/app/types/categoryType";
import { IOption } from "@/app/types/option";
import { handleOnChangeGeneric } from "@/app/utils/handleOnChangeGeneric";
import Button from "../button/Button";
import RowFileList from "../row_image_list/RowImageList";
import RowInput from "../row_input/RowInput";
import styles from "./createCategoryForm.module.css";

interface CreateCategoryFormProps {
  onSuccess: (request: CategoryCreateRequest) => void;
}
const CreateCategoryForm: React.FC<CreateCategoryFormProps> = ({
  onSuccess,
}) => {
  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    setVisible(false);
  };
  const [newCategory, setNewCategory] = useState<CategoryCreateRequest>({
    name: "",
    image: undefined,
  });
  const handleSuccess = () => {
    onSuccess({
      name: newCategory.name,
      image: newCategory.image,
    } as CategoryCreateRequest);
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | IOption[],
    optionName?: string | undefined
  ) => {
    handleOnChangeGeneric(e, setNewCategory, optionName);
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
                  value={newCategory.name}
                  createMode={true}
                  onChange={handleOnChange}
                />
                <RowFileList
                  name="image"
                  onChange={handleOnChange}
                  title="Imagen"
                  createMode={true}
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
            Crear Categoría
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateCategoryForm;
