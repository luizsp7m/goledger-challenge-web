import { toast } from "react-toastify";

export function errorToast(message?: string) {
  toast(message ?? "Ocorreu um erro inesperado", {
    type: "error",
  })
}