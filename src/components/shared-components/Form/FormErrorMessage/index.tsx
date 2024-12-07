import { FieldError, Merge } from "react-hook-form";
import { Container } from "./styles";

interface FormErrorMessageProps {
  error: FieldError | Merge<FieldError, unknown> | undefined;
}

export function FormErrorMessage({ error }: FormErrorMessageProps) {
  if (!error) return null;

  return <Container>{error.message}</Container>;
}
