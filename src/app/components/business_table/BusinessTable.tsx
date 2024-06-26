import { Business } from "@/app/types/businessType";
import dayjs from "dayjs";
import React from "react";
import styles from "./businessTable.module.css";

interface BusinessTableProps {
  businesses: Business[];
}

const BusinessTable: React.FC<BusinessTableProps> = ({ businesses }) => {
  return (
    <table className={styles.tableContainer}>
      <thead>
        <tr className={styles.headerRow}>
          <th>Nombre</th>
          <th>Dueño</th>
          <th>Email</th>
          <th># Reservas</th>
          <th># Direcciones</th>
          <th># Miembros</th>
          <th>Fecha de creación</th>
        </tr>
      </thead>
      <tbody>
        {businesses.map((business) => {
          return (
            <tr key={business.id} className={styles.row}>
              <td>{business.name}</td>
              <td>{business.owner.username}</td>
              <td>{business.owner.email}</td>
              <td>{business.reservationCount}</td>
              <td>{business.addresses.length}</td>
              <td>{business.members.length}</td>
              <td>{dayjs(business.created).format("DD/MM/YYYY")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BusinessTable;
