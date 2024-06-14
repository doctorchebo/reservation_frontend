"use client";
import { useEffect, useState } from "react";
import BusinessAdminDetails from "../components/business_admin_details/BusinessAdminDetails";
import Button from "../components/button/Button";
import DurationAdminList from "../components/duration_admin_list/DurationAdminList";
import Loader from "../components/loader/Loader";
import MemberAdmin from "../components/member_admin/MemberAdmin";
import MemberAdminList from "../components/member_admin_list/MemberAdminList";
import ServiceAdminList from "../components/service_admin_list/ServiceAdminList";
import Typography from "../components/typography/Typography";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import useAuth from "../hooks/useAuth";
import { getBusinessesByUserId } from "../store/business/businessActions";
import { setBusiness } from "../store/business/businessSlice";
import { getMemberByUserId } from "../store/member/memberActions";
import styles from "./page.module.css";
const AdminPage = () => {
  const [showMember, setShowMember] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { businesses, loading } = useAppSelector((state) => state.business);
  const { member } = useAppSelector((state) => state.member);
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (businesses && user) {
      dispatch(getBusinessesByUserId(user.id));
      dispatch(getMemberByUserId(user.id));
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
                  setShowMember(false);
                }}
              />
            );
          })
        )}
        {member && (
          <>
            <Typography size="medium">Mi miembro</Typography>
            <Button onClick={() => setShowMember(true)}>
              {member.firstName} {member.lastName}
            </Button>
          </>
        )}
      </div>
      <div className={styles.listViewContainer}>
        {showMember ? (
          <MemberAdmin />
        ) : (
          <>
            {" "}
            <BusinessAdminDetails />
            <MemberAdminList />
            <ServiceAdminList />
            <DurationAdminList />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
