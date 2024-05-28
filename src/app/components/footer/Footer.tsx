import styles from "./footer.module.css";
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.txtContainer}>
        <p className={styles.txt}>Marcelo Muñoz 2024 &copy;</p>
      </div>
    </div>
  );
};

export default Footer;
