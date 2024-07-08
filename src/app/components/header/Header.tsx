"use client";
import { constants } from "@/app/constants/constants";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import useAuth from "@/app/hooks/useAuth";
import useScroll from "@/app/hooks/useScroll";
import { logout } from "@/app/store/auth/authActions";
import { setIsDrawerOpen } from "@/app/store/ui/uiSlice";
import { LogoutRequest } from "@/app/types/authTypes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineMenu } from "react-icons/md";
import Typography from "../typography/Typography";
import styles from "./header.module.css";

const Header = () => {
  const { isAuthenticated, username } = useAuth();
  const dispatch = useAppDispatch();
  const { isDrawerOpen } = useAppSelector((state) => state.ui);
  const { visible } = useScroll();
  const visibleClass = visible ? styles.visible : styles.hidden;
  const handleLogout = () => {
    const refreshToken = localStorage.getItem(constants.refreshToken);
    if (refreshToken) {
    }
    dispatch(logout({ refreshToken } as LogoutRequest));
  };
  const pathName = usePathname();
  return (
    <nav className={[visibleClass, styles.container].join(" ")}>
      {pathName === "/admin" && (
        <div
          className={styles.btnCtn}
          onClick={() => dispatch(setIsDrawerOpen(!isDrawerOpen))}
        >
          <MdOutlineMenu color="white" size={40} />
        </div>
      )}
      <Link href="/" className={styles.logo}>
        <Image
          src={"/logo_white.svg"}
          alt="logo_icon"
          width={50}
          height={50}
          priority={true}
        />
      </Link>
      <div className={styles.titleContainer}>
        <Typography size="large" align="left">
          Reservas Online
        </Typography>
      </div>
      <ul className={styles.header}>
        <Link href="/about" className={styles.txt}>
          Acerca
        </Link>
        {isAuthenticated ? (
          <>
            <Link href={"/admin"} className={styles.txt}>
              Admin
            </Link>
            <Link href={"/reservations"} className={styles.txt}>
              Mis Reservas
            </Link>
            <div className={styles.txt} onClick={handleLogout}>
              Cerrar Sesión
            </div>
          </>
        ) : (
          <Link href="/login" className={styles.txt}>
            Iniciar Sesión
          </Link>
        )}
        {isAuthenticated && (
          <div className={styles.username}>Hola {username?.toUpperCase()}</div>
        )}
      </ul>
    </nav>
  );
};

export default Header;
