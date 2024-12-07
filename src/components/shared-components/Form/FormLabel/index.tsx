import { Container } from "./styles";

interface FormLabelProps {
  label: string;
}

export function FormLabel({ label }: FormLabelProps) {
  return <Container>{label}</Container>;
}
