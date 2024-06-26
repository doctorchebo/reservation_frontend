import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllBusinesses } from "@/app/store/business/businessActions";
import { useEffect } from "react";
import BusinessTable from "../business_table/BusinessTable";
import Loader from "../loader/Loader";
import Typography from "../typography/Typography";
import styles from "./businessAdminList.module.css";

const BusinessAdminList = () => {
  const dispatch = useAppDispatch();
  const { businesses, loading } = useAppSelector((state) => state.business);
  useEffect(() => {
    dispatch(getAllBusinesses());
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        businesses.length == 0 && (
          <div>
            <Typography color="dark" size="small">
              No se encontraron negocios
            </Typography>
          </div>
        )
      )}
      {businesses && <BusinessTable businesses={businesses} />}
    </div>
  );
};

export default BusinessAdminList;
