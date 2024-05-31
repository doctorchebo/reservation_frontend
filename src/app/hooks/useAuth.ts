import { useEffect } from "react";
import { constants } from "../constants/constants";
import { setAuthenticated, setUsername } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, username } = useAppSelector(
    (state) => state.authentication
  );
  useEffect(() => {
    const isAuth = localStorage.getItem(constants.authToken);
    if (isAuth) {
      dispatch(setAuthenticated(true));
    }
    const username = localStorage.getItem(constants.username);
    if (username) {
      dispatch(setUsername(username));
    }
  }, []);

  return { isAuthenticated, username };
};

export default useAuth;
