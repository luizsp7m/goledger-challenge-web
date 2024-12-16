import { ReactNode } from "react";
import { Container } from "./styles";

interface ButtonGroupProps {
  children: ReactNode;
}

export function ButtonGroup({ children }: ButtonGroupProps) {
  return <Container>{children}</Container>;
}
