import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllAddressesByBusinessId } from "@/app/store/address/addressActions";
import {
  createBusiness,
  deleteBusiness,
  patchBusinessCategories,
  patchBusinessImages,
  patchBusinessName,
} from "@/app/store/business/businessActions";
import { setSuccess } from "@/app/store/business/businessSlice";
import { getAllCategories } from "@/app/store/category/categoryActions";
import {
  BusinessCreateRequest,
  BusinessPatchCategoriesRequest,
  BusinessPatchImagesRequest,
  BusinessPatchNameRequest,
} from "@/app/types/businessType";
import { IFile } from "@/app/types/imageType";
import { IOption } from "@/app/types/option";
import { createToast } from "@/app/utils/createToast";
import { useEffect, useState } from "react";
import ConfirmationDialog from "../confirmation_dialog/ConfirmationDialog";
import CreateBusinessForm from "../create_business_form/CreateBusinessForm";
import Loader from "../loader/Loader";
import RowButton from "../row_button/RowButton";
import RowFileList from "../row_image_list/RowImageList";
import RowInput from "../row_input/RowInput";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import Typography from "../typography/Typography";
const BusinessAdminDetails = () => {
  const dispatch = useAppDispatch();
  const { business, success, loading } = useAppSelector(
    (state) => state.business
  );
  const { categories } = useAppSelector((state) => state.category);

  const [selectedBusinessId, setSelectedBusinessId] = useState<number | null>(
    null
  );
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  useEffect(() => {
    if (success) {
      createToast("¡Éxito!", "success", 3000);
      dispatch(setSuccess(false));
    }
  }, [success]);

  const handlePatchBusinessName = (
    name: string | number | undefined,
    id: number | undefined
  ) => {
    dispatch(
      patchBusinessName({
        businessId: business?.id,
        name: name,
      } as BusinessPatchNameRequest)
    );
  };
  const handlePatchCategories = (options: IOption[]) => {
    if (business) {
      dispatch(
        patchBusinessCategories({
          businessId: business.id,
          categoryIds: options.map((o) => o.id),
        } as BusinessPatchCategoriesRequest)
      );
    }
  };
  const handlePatchBusinessImages = (
    files: IFile[],
    id?: string | number | undefined
  ) => {
    if (business) {
      dispatch(
        patchBusinessImages({
          businessId: business.id,
          files: files,
        } as BusinessPatchImagesRequest)
      );
    }
  };

  const handleCreateBusiness = (request: BusinessCreateRequest) => {
    dispatch(createBusiness(request));
  };

  const handleShowModal = (businessId: number) => {
    setSelectedBusinessId(businessId);
    setOpenModal(true);
  };

  const handleDeleteBusiness = () => {
    if (selectedBusinessId) {
      dispatch(deleteBusiness(selectedBusinessId));
      setOpenModal(false);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    business && (
      <>
        <ConfirmationDialog
          cancelText="Cancelar"
          onCancel={() => setOpenModal(false)}
          onSuccess={handleDeleteBusiness}
          open={openModal}
          successText="Eliminar"
          title="Eliminar Negocio"
          content="¿Estás seguro de eliminar el negocio? Todas las reservas asociadas serán eliminadas."
        />
        <Typography size="large" color="dark">
          Datos básicos
        </Typography>
        <CreateBusinessForm onSuccess={handleCreateBusiness} />
        <table>
          <tbody>
            <RowInput
              title="Nombre"
              initialValue={business.name}
              onSuccess={handlePatchBusinessName}
            />
            <RowMultiselect
              title="Categorías"
              initialOptions={business.categories}
              onSuccess={handlePatchCategories}
              options={categories}
            />
            <RowFileList
              onSuccess={handlePatchBusinessImages}
              options={business.images.map((image) => {
                return { id: image.id, name: image.url };
              })}
              title="Imágenes"
            />
            <RowButton
              onClick={() => handleShowModal(business.id)}
              title="Eliminar negocio"
              type="cancel"
            />
          </tbody>
        </table>
      </>
    )
  );
};

export default BusinessAdminDetails;
