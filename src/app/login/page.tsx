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
import { useState } from "react";
import Button from "../components/button/Button";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import styles from "./login.module.css";
import { LoginRequest } from "../types/authTypes";
import { login } from "../store/auth/authActions";
const Login = () => {
    const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState<LoginRequest>({ email: "", password: "" });
  const { error } = useAppSelector((state) => state.authentication);
  const errors = error?.errors ? error.errors : null;
  const handleLogin = () => {
    dispatch(login(credentials))
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

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <FormControl error={errors?.username != undefined}>
          <InputLabel>Email</InputLabel>
          <OutlinedInput
            name="email"
            label="Email"
            value={credentials.email}
            onChange={handleChange}
          />
          {errors?.username &&
            errors.username.map((message, index) => (
              <FormHelperText key={index}>{message}</FormHelperText>
            ))}
        </FormControl>
        <FormControl error={errors?.password != undefined}>
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
          />
          {errors?.password &&
            errors.password.map((message, index) => (
              <FormHelperText key={index}>{message}</FormHelperText>
            ))}
        </FormControl>
        <Button
          name="Iniciar Sesión"
          onClick={handleLogin}
          disabled={
            credentials.email.length == 0 || credentials.password.length == 0
          }
        />
        <div className={styles.txt}>
          ¿No tienes una cuenta? <Link href="/signup">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
