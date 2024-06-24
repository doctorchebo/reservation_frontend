import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  createBusiness,
  patchBusinessCategories,
  patchBusinessImages,
  patchBusinessName,
} from "@/app/store/business/businessActions";
import { setSuccess } from "@/app/store/business/businessSlice";
import { getCategories } from "@/app/store/category/categoryActions";
import {
  BusinessCreateRequest,
  BusinessPatchCategoriesRequest,
  BusinessPatchImagesRequest,
  BusinessPatchNameRequest,
} from "@/app/types/businessType";
import { IFile } from "@/app/types/imageType";
import { IOption } from "@/app/types/option";
import { createToast } from "@/app/utils/createToast";
import { useEffect } from "react";
import CreateBusinessForm from "../create_business_form/CreateBusinessForm";
import Loader from "../loader/Loader";
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

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (success) {
      createToast("Dato editado!", "success", 3000);
      dispatch(setSuccess(false));
    }
  }, [success]);

  const handlePatchBusinessName = (name: string | number) => {
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
  if (loading) {
    return <Loader />;
  }
  return (
    business && (
      <>
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
          </tbody>
        </table>
      </>
    )
  );
};

export default BusinessAdminDetails;
