import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getServicesByBusinessId, getServicesByCategoryId } from "@/app/store/service/serviceActions";
import { setserviceId } from "@/app/store/service/serviceSlice";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect } from "react";
import styles from "./serviceList.module.css";

interface ServiceListProps {
  categoryId?: number;
  businessId?: number;
}

const ServiceList: React.FC<ServiceListProps> = ({
  categoryId,
  businessId,
}) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (categoryId) {
      dispatch(getServicesByCategoryId(categoryId));
    }
  }, [categoryId]);

  const { services, serviceId } = useAppSelector((state) => state.service);

  useEffect(() => {
    if (businessId) {
      dispatch(getServicesByBusinessId(businessId));
    }
  }, [businessId]);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setserviceId(event.target.value as string));
  };

  return (
    <div className={styles.container}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Servicio</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={serviceId!}
          label="Service"
          onChange={handleChange}
        >
          {services.map((service) => {
            return (
              <MenuItem key={service.id} value={service.id}>
                {service.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default ServiceList;
