import { ReactNode } from "react";
import { Container } from "./styles";

interface TableProps {
  isFetching?: boolean;
  children: ReactNode;
}

export function Table({ isFetching = false, children }: TableProps) {
  return (
    <Container $isFetching={isFetching}>
      <table>{children}</table>
    </Container>
  );
}
