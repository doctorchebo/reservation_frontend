import { useAppSelector } from "@/app/hooks/hooks";
import Typography from "../typography/Typography";
import styles from "./businessAdminDetails.module.css";
const BusinessAdminDetails = () => {
  const { business } = useAppSelector((state) => state.business);
  return (
    business && (
      <div className={styles.container}>
        <Typography size="medium" color="dark">
          Nombre:
        </Typography>
        <Typography size="small" color="dark">
          {business.name}
        </Typography>
        <Typography size="medium" color="dark">
          Categorías:
        </Typography>
        {business.categories.map((category) => {
          return (
            <Typography key={category.id} size="small" color="dark">
              {category.name}
            </Typography>
          );
        })}
        <Typography size="medium" color="dark">
          Direcciones:
        </Typography>
        <Typography size="small" color="dark">
          {business.addresses.map((address) => {
            return (
              <div key={address.id}>
                <Typography size="small" color="dark">
                  {address.name}
                </Typography>
                <Typography size="medium" color="dark">
                  Coordenadas:
                </Typography>
                <Typography size="small" color="dark">
                  {address.geolocation.latitude}
                </Typography>
                <Typography size="small" color="dark">
                  {address.geolocation.longitude}
                </Typography>
              </div>
            );
          })}
        </Typography>
        <Typography size="medium" color="dark">
          Imágenes:
        </Typography>
        <Typography size="small" color="dark">
          {business.images.map((image) => {
            return (
              <Typography key={image.id} size="small" color="dark">
                {image.url}
              </Typography>
            );
          })}
        </Typography>
      </div>
    )
  );
};

export default BusinessAdminDetails;
