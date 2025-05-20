// utils/toastHelper.ts
import { toast, ToastPosition } from "react-toastify";

export const showToast = (
  msg: string,
  type: "success" | "error" | "info" | "warning" = "info",
  theme: "light" | "dark" = "light",
  position: ToastPosition = "top-right" // Gunakan ToastPosition untuk tipe yang valid
) => {
  const toastOptions = {
    position: position,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: theme,
    style: {
      fontFamily: "Calibri, sans-serif",
      fontSize: "14px",
      fontWeight: 600, // Semi bold
    },
  };

  switch (type) {
    case "success":
      toast.success(msg, toastOptions);
      break;
    case "error":
      toast.error(msg, toastOptions);
      break;
    case "info":
      toast.info(msg, toastOptions);
      break;
    case "warning":
      toast.warning(msg, toastOptions);
      break;
    default:
      toast(msg, toastOptions);
  }
};
