import { useAppSelector } from "./hooks";

const useAuth = () => {
  const { isAuthenticated } = useAppSelector((state) => state.authentication);
  return { isAuthenticated };
};

export default useAuth;
