import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setServiceId } from "@/app/store/service/serviceSlice";
import { Service } from "@/app/types/serviceType";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styles from "./serviceList.module.css";

interface ServiceListProps {
  services?: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  const dispatch = useAppDispatch();
  const { serviceId } = useAppSelector((state) => state.service);
  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setServiceId(event.target.value as string));
  };

  return (
    services && (
      <div className={styles.container}>
        <FormControl fullWidth>
          <InputLabel>Servicio</InputLabel>
          <Select
            defaultValue={serviceId || ""}
            value={serviceId || ""}
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
    )
  );
};

export default ServiceList;
