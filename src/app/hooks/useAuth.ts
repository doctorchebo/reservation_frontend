import { useEffect } from "react";
import { constants } from "../constants/constants";
import { setAuthenticated, setUsername } from "../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "./hooks";

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { isAuthenticated, username, email } = useAppSelector(
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
  }, [user]);

  return { isAuthenticated, username, email };
};

export default useAuth;
