"use client";
import useScroll from "@/app/hooks/useScroll";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  const { visible } = useScroll();
  const visibleClass = visible ? styles.visible : styles.hidden;
  return (
    <nav className={[visibleClass, styles.container].join(" ")}>
      <Link href="/" className={styles.logo}>
        <Image
          src={"/logo_white.svg"}
          alt="logo_icon"
          width={50}
          height={50}
          priority={true}
        />
      </Link>
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
