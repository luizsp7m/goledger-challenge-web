import { Container } from "./styles";

interface LabelProps {
  label: string;
}

export function Label({ label }: LabelProps) {
  return <Container>{label}</Container>;
}
