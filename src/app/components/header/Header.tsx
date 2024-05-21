"use client";
import useScroll from "@/app/hooks/useScroll";
import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  const { visible } = useScroll();
  const visibleClass = visible ? styles.visible : styles.hidden;
  return (
    <nav className={[visibleClass, styles.container].join(" ")}>
      <ul className={styles.header}>
        <Link href="/about" className={styles.txt}>
          Acerca
        </Link>
        <Link href="/login" className={styles.txt}>
          Login
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
