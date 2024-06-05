"use client";
import ServiceList from "@/app/components/service_list/ServiceList";
import Typography from "@/app/components/typography/Typography";
import BusinessList from "../../components/business_list/BusinessList";
import DatePick from "../../components/date_picker/DatePick";
import styles from "./page.module.css";
const CategoryPage = ({ params }: { params: { id: number } }) => {
  return (
    <div className={styles.container}>
      <Typography color="dark" size="medium">
        Elige un servicio
      </Typography>
      <ServiceList categoryId={params.id} />
      <Typography color="dark" size="medium">
        Elige día y hora para tu reserva
      </Typography>
      <DatePick />
      <BusinessList categoryId={params.id} />
    </div>
  );
};

export default CategoryPage;
