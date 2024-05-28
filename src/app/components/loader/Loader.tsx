import { ClipLoader } from "react-spinners";
import styles from "./loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <ClipLoader color="rgb(65, 67, 97)" />
    </div>
  );
};

export default Loader;
