import { toast } from "react-toastify";

export function successToast(message?: string) {
  toast(message ?? "Operação realizada com sucesso", {
    type: "success",
  })
}