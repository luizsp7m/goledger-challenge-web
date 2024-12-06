import { Warning } from "@phosphor-icons/react";
import { Container } from "./styles";

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({
  message = "Ocorreu um erro inesperado",
}: ErrorMessageProps) {
  return (
    <Container>
      <Warning />
      <span>{message}</span>
    </Container>
  );
}
