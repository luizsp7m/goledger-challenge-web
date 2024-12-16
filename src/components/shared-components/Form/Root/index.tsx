import { FormHTMLAttributes } from "react";
import { Container } from "./styles";

export function Root({
  children,
  ...props
}: FormHTMLAttributes<HTMLFormElement>) {
  return <Container {...props}>{children}</Container>;
}
