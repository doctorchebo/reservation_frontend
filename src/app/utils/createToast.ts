import { ToastOptions, toast } from "react-toastify";

export const createToast = (
  message: string,
  type: "success" | "error",
  timeout: number
) => {
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
      return toast.success(message, options);
    case "error":
      return toast.error(message, options);
    default:
      return toast(message, options);
  }
};
