import { Warning } from "@phosphor-icons/react";
import { Container } from "./styles";

interface ErrorMessageProps {
  message?: string;
  withPadding?: boolean;
}

export function ErrorMessage({
  message = "Ocorreu um erro inesperado",
  withPadding = false,
}: ErrorMessageProps) {
  return (
    <Container $withPadding={withPadding}>
      <Warning />
      <span>{message}</span>
    </Container>
  );
}
