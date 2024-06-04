import { useEffect } from "react";
import { ToastOptions, toast } from "react-toastify";
import { useAppSelector } from "./hooks";

const useToast = (message: string, type: string, timeout: number) => {
  const { reservation } = useAppSelector((state) => state.reservation);
  useEffect(() => {
    if (reservation) {
      const options: ToastOptions<unknown> | undefined = {
        position: "top-center",
        autoClose: timeout,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      };
      switch (type) {
        case "success":
          toast.success(message, options);
          break;
        default:
          toast(message, options);
      }
    }
  }, [reservation]);
};

export default useToast;
