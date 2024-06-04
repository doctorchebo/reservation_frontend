"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
} from "@mui/material";
import { redirect } from "next/navigation";
import { useRef, useState } from "react";
import Button from "../components/button/Button";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import useAuth from "../hooks/useAuth";
import { login } from "../store/auth/authActions";
import { LoginRequest } from "../types/authTypes";
import styles from "./login.module.css";
const Login = () => {
  const { isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const { error } = useAppSelector((state) => state.authentication);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const errors = error?.errors ? error.errors : null;
  const handleLogin = () => {
    dispatch(login(credentials));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  if (isAuthenticated) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <FormControl error={errors != null}>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            name="email"
            label="Email"
            value={credentials.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl error={errors != null}>
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            name="password"
            label="Password"
            value={credentials.password}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                console.log("Enter down! -----------");
                buttonRef?.current?.focus();
              }
            }}
          />
          {errors && (
            <FormHelperText>"Email o contraseña incorrectos"</FormHelperText>
          )}
        </FormControl>

        <Button
          name="Iniciar Sesión"
          onClick={handleLogin}
          disabled={
            credentials.email.length == 0 || credentials.password.length == 0
          }
          ref={buttonRef}
        />
        <div className={styles.txt}>
          ¿No tienes una cuenta? <Link href="/signup">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
