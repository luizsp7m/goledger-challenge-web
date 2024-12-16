import { Container } from "./styles";

interface InputErrorMessageProps {
  error?: string;
}

export function InputErrorMessage({ error }: InputErrorMessageProps) {
  if (!error) return null;

  return <Container>{error}</Container>;
}
