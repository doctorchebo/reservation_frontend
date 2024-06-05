"use client";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Button from "../components/button/Button";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { signup } from "../store/auth/authActions";
import { setError } from "../store/auth/authSlice";
import { SignupRequest } from "../types/authTypes";
import styles from "./signup.module.css";
const Signup = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [credentials, setCredentials] = useState<SignupRequest>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { error, isSignedup } = useAppSelector((state) => state.authentication);
  const errors = error?.errors ? error.errors : null;
  const handleLogin = () => {
    dispatch(signup(credentials));
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
  useEffect(() => {
    if (isSignedup) {
      router.replace("/login");
    }
    return () => {
      dispatch(setError(undefined));
    };
  }, [isSignedup]);

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <FormControl error={errors?.username != undefined}>
            <InputLabel>Usuario</InputLabel>
            <OutlinedInput
              name="username"
              label="Username"
              value={credentials.username}
              onChange={handleChange}
            />
            {errors?.username &&
              errors.username.map((message, index) => (
                <FormHelperText key={index}>{message}</FormHelperText>
              ))}
          </FormControl>
          <FormControl error={errors?.email != undefined}>
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              name="email"
              label="Email"
              value={credentials.email}
              onChange={handleChange}
            />
            {errors?.email &&
              errors.email.map((message, index) => (
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
          <FormControl error={errors?.confirmPassword != undefined}>
            <InputLabel>Confirmar password</InputLabel>
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
              name="confirmPassword"
              label="Confirmar Password"
              value={credentials.confirmPassword}
              onChange={handleChange}
            />
            {errors?.confirmPassword &&
              errors.confirmPassword.map((message, index) => (
                <FormHelperText key={index}>{message}</FormHelperText>
              ))}
          </FormControl>
          <Button
            children="Registrarse"
            onClick={handleLogin}
            disabled={
              credentials.username.length == 0 ||
              credentials.email.length == 0 ||
              credentials.password.length == 0
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
