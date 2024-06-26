"use client";
import { useEffect, useState } from "react";
import AddressAdminList from "../components/address_admin_list/AddressAdminList";
import BusinessAdminDetails from "../components/business_admin_details/BusinessAdminDetails";
import BusinessAdminList from "../components/business_admin_list/BusinessAdminList";
import Button from "../components/button/Button";
import CategoryAdminList from "../components/category_admin_list/CategoryAdminList";
import DurationAdminList from "../components/duration_admin_list/DurationAdminList";
import Loader from "../components/loader/Loader";
import MemberAdmin from "../components/member_admin/MemberAdmin";
import MemberAdminList from "../components/member_admin_list/MemberAdminList";
import ServiceAdminList from "../components/service_admin_list/ServiceAdminList";
import TabList from "../components/tab_list/TabList";
import Typography from "../components/typography/Typography";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import useAuth from "../hooks/useAuth";
import { getAllBusinessesByUserId } from "../store/business/businessActions";
import { setBusiness } from "../store/business/businessSlice";
import { getMemberByUserId } from "../store/member/memberActions";
import { Business } from "../types/businessType";
import styles from "./page.module.css";
const AdminPage = () => {
  const [shownPage, setShownPage] = useState<"business" | "member" | "admin">(
    "business"
  );
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();
  const { business, businesses, loading } = useAppSelector(
    (state) => state.business
  );
  const { member } = useAppSelector((state) => state.member);
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (businesses && user) {
      dispatch(getAllBusinessesByUserId(user.id));
      dispatch(getMemberByUserId(user.id));
    }
  }, [user]);

  /*  useEffect(() => {
    if (business) {
      dispatch(setBusiness(business));
    } else if (businesses) {
      dispatch(setBusiness(businesses[0]));
    }
  }, [business]); */

  const handleSelectBusiness = (business: Business) => {
    dispatch(setBusiness(business));
    setShownPage("business");
  };

  const showPage = () => {
    switch (shownPage) {
      case "admin":
        return (
          <TabList
            pages={[
              { name: "Categorías", component: <CategoryAdminList /> },
              { name: "Negocios", component: <BusinessAdminList /> },
            ]}
            initialPage={"Categorías"}
          />
        );
      case "business":
        return (
          <TabList
            pages={[
              { name: "Datos básicos", component: <BusinessAdminDetails /> },
              { name: "Sucursales", component: <AddressAdminList /> },
              { name: "Miembros", component: <MemberAdminList /> },
              { name: "Servicios", component: <ServiceAdminList /> },
              { name: "Duraciones", component: <DurationAdminList /> },
            ]}
            initialPage={"Datos básicos"}
          />
        );
      case "member":
        return <MemberAdmin />;
      default:
        break;
    }
  };
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
                onClick={() => handleSelectBusiness(business)}
              />
            );
          })
        )}
        {member && (
          <>
            <Typography size="medium">Mi miembro</Typography>
            <Button onClick={() => setShownPage("member")}>
              {member.firstName} {member.lastName}
            </Button>
          </>
        )}
        {user?.isSuperUser && (
          <>
            <Typography size="medium">Administración</Typography>
            <Button onClick={() => setShownPage("admin")}>
              Configuraciones avanzadas
            </Button>
          </>
        )}
      </div>
      <div className={styles.listViewContainer}>{showPage()}</div>
    </div>
  );
};

export default AdminPage;
