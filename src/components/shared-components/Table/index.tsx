import { ReactNode } from "react";
import { Container } from "./styles";

interface TableProps {
  children: ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <Container>
      <table>{children}</table>
    </Container>
  );
}
