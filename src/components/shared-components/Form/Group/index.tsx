import { ReactNode } from "react";
import { Container } from "./styles";

interface GroupProps {
  children: ReactNode;
}

export function Group({ children }: GroupProps) {
  return <Container>{children}</Container>;
}
