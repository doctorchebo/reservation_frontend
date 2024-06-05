import { useEffect } from "react";
import { constants } from "../constants/constants";
import { authenticate } from "../store/auth/authActions";
import { setUsername } from "../store/auth/authSlice";
import { getUserData } from "../store/user/userActions";
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
      dispatch(authenticate());
    }

    const username = localStorage.getItem(constants.username);
    if (username) {
      dispatch(setUsername(username));
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const email = localStorage.getItem(constants.email);
      if (email) {
        dispatch(getUserData(email));
      }
    }
  }, [isAuthenticated]);

  return { isAuthenticated, username, email };
};

export default useAuth;
