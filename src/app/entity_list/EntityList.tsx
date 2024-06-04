import React from "react";
import styles from "./entityList.module.css";
interface EntityListProps {
  entity: any;
}
const EntityList: React.FC<EntityListProps> = ({ entity }) => {
  return <div className={styles.container}>{entity}</div>;
};

export default EntityList;
