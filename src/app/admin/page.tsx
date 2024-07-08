"use client";
import { useEffect } from "react";
import AddressAdminList from "../components/address_admin_list/AddressAdminList";
import BusinessAdminDetails from "../components/business_admin_details/BusinessAdminDetails";
import BusinessAdminList from "../components/business_admin_list/BusinessAdminList";
import CategoryAdminList from "../components/category_admin_list/CategoryAdminList";
import DurationAdminList from "../components/duration_admin_list/DurationAdminList";
import MemberAdmin from "../components/member_admin/MemberAdmin";
import MemberAdminList from "../components/member_admin_list/MemberAdminList";
import ScheduleAdminList from "../components/schedule_admin_list/ScheduleAdminList";
import ServiceAdminList from "../components/service_admin_list/ServiceAdminList";
import SideBar from "../components/sidebar/SideBar";
import TabList from "../components/tab_list/TabList";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getAllBusinessesByUserId } from "../store/business/businessActions";
import { getMemberByUserId } from "../store/member/memberActions";
import { setIsDrawerOpen } from "../store/ui/uiSlice";
import styles from "./page.module.css";
const AdminPage = () => {
  const { selectedTab } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  const { businesses } = useAppSelector((state) => state.business);
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    dispatch(setIsDrawerOpen(true));
  }, []);

  useEffect(() => {
    if (businesses && user) {
      dispatch(getAllBusinessesByUserId(user.id));
      dispatch(getMemberByUserId(user.id));
    }
  }, [user]);

  const showPage = () => {
    switch (selectedTab) {
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
              { name: "Horarios", component: <ScheduleAdminList /> },
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
      <SideBar />
      <div className={styles.listViewContainer}>{showPage()}</div>
    </div>
  );
};

export default AdminPage;
