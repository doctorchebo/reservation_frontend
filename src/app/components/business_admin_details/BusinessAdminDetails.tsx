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
import { Category } from "@/app/types/categoryType";
import { createToast } from "@/app/utils/createToast";
import { Autocomplete, Input, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { MdCancel, MdCheck, MdModeEdit } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./businessAdminDetails.module.css";
const BusinessAdminDetails = () => {
  const dispatch = useAppDispatch();
  const { business, success } = useAppSelector((state) => state.business);
  const { categories } = useAppSelector((state) => state.category);
  const [name, setName] = useState("");
  const [editName, setEditName] = useState(false);

  const [bCategories, setBCategories] = useState<Category[]>([]);
  const [editCategories, setEditCategories] = useState(false);

  useEffect(() => {
    if (editCategories) {
      dispatch(getCategories());
    }
  }, [editCategories]);

  useEffect(() => {
    if (business) {
      setName(business.name);
      setBCategories(business.categories);
    }
  }, [business]);

  useEffect(() => {
    if (success) {
      createToast("Dato editado!", "success", 3000);
      dispatch(setSuccess(false));
    }
  }, [success]);

  const handleSaveName = () => {
    dispatch(
      patchBusinessName({
        businessId: business?.id,
        name: name,
      } as BusinessPatchNameRequest)
    );
    setEditName(false);
  };
  const handleSaveCategories = () => {
    dispatch(
      patchBusinessCategories({
        businessId: business?.id,
        categoryIds: bCategories.map((c) => c.id),
      } as BusinessPatchCategoriesRequest)
    );
    setEditCategories(false);
  };

  return (
    business && (
      <>
        <Typography size="large" color="dark">
          Datos básicos
        </Typography>
        <table className={styles.table}>
          <tbody>
            <tr>
              <td>
                <Typography size="medium" color="dark" align="left">
                  Nombre:
                </Typography>
              </td>
              <td>
                {editName ? (
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  <Typography size="small" color="dark" align="left">
                    {name}
                  </Typography>
                )}
              </td>
              <td>
                <div className={styles.editContainer}>
                  {editName ? (
                    <>
                      <MdCheck
                        color="rgb(62, 128, 70)"
                        onClick={handleSaveName}
                      />
                      <MdCancel
                        color="rgb(207, 62, 51)"
                        onClick={() => {
                          setName(business.name);
                          setEditName(false);
                        }}
                      />
                    </>
                  ) : (
                    <MdModeEdit
                      color="rgb(96, 99, 143)"
                      onClick={() => setEditName(true)}
                    />
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Typography size="medium" color="dark" align="left">
                  Categorías:
                </Typography>
              </td>
              <td>
                {editCategories ? (
                  <Autocomplete
                    multiple
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    value={bCategories}
                    onChange={(event, newValue) => {
                      setBCategories(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder="Categorías"
                      />
                    )}
                  />
                ) : (
                  bCategories.map((category) => {
                    return (
                      <Typography
                        key={category.id}
                        size="small"
                        color="dark"
                        align="left"
                      >
                        {category.name}
                      </Typography>
                    );
                  })
                )}
              </td>
              <td>
                <div className={styles.editContainer}>
                  {editCategories ? (
                    <>
                      <MdCheck
                        color="rgb(62, 128, 70)"
                        onClick={handleSaveCategories}
                      />
                      <MdCancel
                        color="rgb(207, 62, 51)"
                        onClick={() => {
                          setBCategories(business.categories);
                          setEditCategories(false);
                        }}
                      />
                    </>
                  ) : (
                    <MdModeEdit
                      color="rgb(96, 99, 143)"
                      onClick={() => setEditCategories(true)}
                    />
                  )}
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <Typography size="medium" color="dark" align="left">
                  Direcciones:
                </Typography>
              </td>
              <td>
                {business.addresses.map((address) => {
                  return (
                    <div key={address.id}>
                      <Typography size="small" color="dark" align="left">
                        {address.name}
                      </Typography>
                      <Typography size="small" color="dark" align="left">
                        Coordenadas:
                      </Typography>
                      <Typography size="small" color="dark" align="left">
                        {address.geolocation.latitude}
                      </Typography>
                      <Typography size="small" color="dark" align="left">
                        {address.geolocation.longitude}
                      </Typography>
                    </div>
                  );
                })}
              </td>
            </tr>
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
