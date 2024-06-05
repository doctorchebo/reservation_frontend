"use client";
import { useEffect } from "react";
import BusinessAdminDetails from "../components/business_admin_details/BusinessAdminDetails";
import Button from "../components/button/Button";
import DurationAdminList from "../components/duration_admin_list/DurationAdminList";
import Loader from "../components/loader/Loader";
import MemberAdminList from "../components/member_admin_list/MemberAdminList";
import ServiceAdminList from "../components/service_admin_list/ServiceAdminList";
import Typography from "../components/typography/Typography";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import useAuth from "../hooks/useAuth";
import { getBusinessesByUserId } from "../store/business/businessActions";
import { setBusiness } from "../store/business/businessSlice";
import styles from "./page.module.css";
const AdminPage = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { businesses, loading } = useAppSelector((state) => state.business);
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (businesses && user) {
      dispatch(getBusinessesByUserId(user.id));
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <div className={styles.entityContainer}>
        <Typography size="medium">Mis negocios</Typography>
        {loading ? (
          <Loader />
        ) : (
          businesses.map((business) => {
            return (
              <Button
                key={business.id}
                children={business.name}
                onClick={() => {
                  dispatch(setBusiness(business));
                  console.log("business selected with id :" + business.id);
                }}
              />
            );
          })
        )}
      </div>
      <div className={styles.listViewContainer}>
        <BusinessAdminDetails />
        <MemberAdminList />
        <ServiceAdminList />
        <DurationAdminList />
      </div>
    </div>
  );
};

export default AdminPage;
