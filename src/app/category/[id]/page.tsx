"use client";
import ServiceList from "@/app/components/service_list/ServiceList";
import BusinessList from "../../components/business_list/BusinessList";
import DatePick from "../../components/date_picker/DatePick";
import styles from "./page.module.css";
const CategoryPage = ({ params }: { params: { id: number } }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Elige un servicio</div>
      <ServiceList categoryId={params.id} />
      <div className={styles.title}>Elige día y hora para tu reserva</div>
      <DatePick />
      <BusinessList categoryId={params.id} />
    </div>
  );
};

export default CategoryPage;
