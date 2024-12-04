import { ReactNode } from "react";
import { Container } from "./styles";

interface TableProps {
  isLoading?: boolean;
  children: ReactNode;
}

export function Table({ isLoading = false, children }: TableProps) {
  return (
    <Container $isLoading={isLoading}>
      <table>{children}</table>
    </Container>
  );
}
