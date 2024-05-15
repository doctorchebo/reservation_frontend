import React from "react";
import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.header}>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
