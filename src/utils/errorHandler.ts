import { errorToast } from "./errorToast";

export function errorHandler(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "error" in error.data
  ) {
    switch (error.data.error) {
      case "failed to delete asset: another asset holds a reference to this one":
        errorToast("Outro ativo contém uma referência a este");
        break;

      default:
        errorToast();
    }

    return;
  }
}
