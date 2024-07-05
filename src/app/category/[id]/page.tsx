"use client";
import ServiceList from "@/app/components/service_list/ServiceList";
import Typography from "@/app/components/typography/Typography";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { getAllBusinessesByCategoryId } from "@/app/store/business/businessActions";
import { getAllServicesByCategoryId } from "@/app/store/service/serviceActions";
import { useEffect } from "react";
import BusinessList from "../../components/business_list/BusinessList";
import DatePick from "../../components/date_picker/DatePick";
import styles from "./page.module.css";
const CategoryPage = ({ params }: { params: { id: number } }) => {
  const dispatch = useAppDispatch();
  const { services } = useAppSelector((state) => state.service);
  const { businesses } = useAppSelector((state) => state.business);
  useEffect(() => {
    if (params.id) {
      dispatch(getAllServicesByCategoryId(params.id));
      dispatch(getAllBusinessesByCategoryId(params.id));
    }
  }, [params.id]);

  return (
    <div className={styles.container}>
      <Typography color="dark" size="medium">
        Elige un servicio
      </Typography>
      <ServiceList services={services} />
      <Typography color="dark" size="medium">
        Elige día y hora para tu reserva
      </Typography>
      <DatePick />
      <BusinessList businesses={businesses} />
    </div>
  );
};

export default CategoryPage;
