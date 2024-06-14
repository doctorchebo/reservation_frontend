import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  patchBusinessCategories,
  patchBusinessName,
} from "@/app/store/business/businessActions";
import { setSuccess } from "@/app/store/business/businessSlice";
import { getCategories } from "@/app/store/category/categoryActions";
import {
  BusinessPatchCategoriesRequest,
  BusinessPatchNameRequest,
} from "@/app/types/businessType";
import { IOption } from "@/app/types/option";
import { createToast } from "@/app/utils/createToast";
import { useEffect } from "react";
import RowInput from "../row_input/RowInput";
import RowMultiselect from "../row_multiselect/RowMultiselect";
import Typography from "../typography/Typography";
import styles from "./businessAdminDetails.module.css";
const BusinessAdminDetails = () => {
  const dispatch = useAppDispatch();
  const { business, success } = useAppSelector((state) => state.business);
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

  return (
    business && (
      <>
        <Typography size="large" color="dark">
          Datos básicos
        </Typography>
        <table>
          <tbody>
            <RowInput
              title="Nombre:"
              initialValue={business.name}
              onSuccess={handlePatchBusinessName}
            />
            <RowMultiselect
              title="Categorías"
              initialOptions={business.categories}
              onSuccess={handlePatchCategories}
              options={categories}
            />
            <tr>
              <td>
                <Typography size="medium" color="dark" align="left">
                  Imágenes:
                </Typography>
              </td>
              <td>
                {business.images.map((image) => {
                  return (
                    <Typography
                      key={image.id}
                      size="small"
                      color="dark"
                      align="left"
                    >
                      {image.url}
                    </Typography>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </>
    )
  );
};

export default BusinessAdminDetails;
