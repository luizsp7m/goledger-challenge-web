export function errorMessageHandler(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof error.data === "object" &&
    error.data !== null &&
    "error" in error.data
  ) {
    const errorMessage = error.data.error as string;

    if (errorMessage.includes("another asset holds a reference to this one"))
      return "Outro ativo mantém uma referência a este";

    if (errorMessage.includes("asset not found")) {
      return "Registro não encontrado";
    }

    if (errorMessage.includes("asset already exists")) {
      return "Esse registro já existe";
    }

    if (errorMessage.includes("asset does not exist")) {
      return "Esse registro não existe";
    }

    if (errorMessage.includes("Invalid username or password")) {
      return "Usuário não autenticado";
    }

    return "Ocorreu um erro inesperado";
  }
}
