import { Warning } from "@phosphor-icons/react";
import { Container } from "./styles";
import { Link } from "react-router-dom";
import { HOME_PREFIX_PATH } from "~/configs/AppConfig";

interface ErrorMessageProps {
  message?: string;
  showRedirectToHomeButton?: boolean;
}

export function ErrorMessage({
  message = "Ocorreu um erro inesperado",
  showRedirectToHomeButton = false,
}: ErrorMessageProps) {
  return (
    <Container>
      <Warning />
      <span>{message}</span>

      {showRedirectToHomeButton && (
        <Link to={HOME_PREFIX_PATH}>Ir para início</Link>
      )}
    </Container>
  );
}
