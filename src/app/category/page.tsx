import BusinessList from "../components/business_list/BusinessList";
import DatePick from "../components/date_picker/DatePick";
import styles from "./page.module.css";
const CategoryPage = () => {
  return (
    <div className={styles.container}>
      <DatePick />
      <BusinessList />
    </div>
  );
};

export default CategoryPage;
