import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  createCategory,
  deleteCategory,
  patchCategoryImage,
  patchCategoryName,
} from "@/app/store/category/categoryActions";
import { setSuccess } from "@/app/store/category/categorySlice";
import {
  CategoryCreateRequest,
  CategoryPatchImageRequest,
  CategoryPatchNameRequest,
} from "@/app/types/categoryType";
import { IFile } from "@/app/types/imageType";
import { IOption } from "@/app/types/option";
import { createToast } from "@/app/utils/createToast";
import React, { useEffect, useState } from "react";
import ConfirmationDialog from "../confirmation_dialog/ConfirmationDialog";
import CreateCategoryForm from "../create_category_form/CreateCategoryForm";
import Loader from "../loader/Loader";
import RowButton from "../row_button/RowButton";
import RowFileList from "../row_image_list/RowImageList";
import RowInput from "../row_input/RowInput";
import Typography from "../typography/Typography";

const CategoryAdminList = () => {
  const dispatch = useAppDispatch();
  const { categories, loading, success } = useAppSelector(
    (state) => state.category
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);

  useEffect(() => {
    if (success) {
      createToast("Éxito!", "success", 3000);
      dispatch(setSuccess(false));
    }
  }, [success]);

  const [openModal, setOpenModal] = useState(false);

  const handlePatchCategoryName = (
    name: string | number | undefined,
    id: number | undefined
  ) => {
    dispatch(
      patchCategoryName({
        categoryId: id,
        name: name,
      } as CategoryPatchNameRequest)
    );
  };

  const handleOpenModal = (id?: string | number | undefined) => {
    setSelectedCategoryId(id as number);
    setOpenModal(true);
  };

  const handleDeleteCategory = () => {
    if (selectedCategoryId) {
      dispatch(deleteCategory(selectedCategoryId));
      setOpenModal(false);
    }
  };

  const handlePatchCategoryImage = (
    files: IFile[],
    id?: string | number | undefined
  ) => {
    id &&
      dispatch(
        patchCategoryImage({
          categoryId: id,
          image: files[0].file,
        } as CategoryPatchImageRequest)
      );
  };

  const handleCreateCategory = (request: CategoryCreateRequest) => {
    dispatch(createCategory(request));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    categories && (
      <>
        <ConfirmationDialog
          cancelText="Cancelar"
          onCancel={() => setOpenModal(false)}
          onSuccess={handleDeleteCategory}
          open={openModal}
          successText="Eliminar"
          title="Eliminar Categorías"
          content="¿Estás seguro de eliminar esta categoría? Los negocios asociados a la categoría dejarán de estarlo"
        />
        <Typography size="large" color="dark">
          Categorías
        </Typography>
        <CreateCategoryForm onSuccess={handleCreateCategory} />
        <table>
          <tbody>
            {categories.map((category, index) => {
              return (
                <React.Fragment key={index}>
                  <RowInput
                    id={category.id}
                    title="Nombre"
                    initialValue={category.name}
                    onSuccess={handlePatchCategoryName}
                  />
                  <RowFileList
                    id={category.id}
                    onSuccess={handlePatchCategoryImage}
                    options={[
                      { id: category.id, name: category.imageUrl } as IOption,
                    ]}
                    title="Imagen"
                  />
                  <RowButton
                    onClick={handleOpenModal}
                    title="Eliminar"
                    id={category.id}
                    type="cancel"
                  />
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </>
    )
  );
};

export default CategoryAdminList;
