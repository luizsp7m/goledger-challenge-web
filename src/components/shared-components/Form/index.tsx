import { FormHTMLAttributes } from "react";
import { Container } from "./styles";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {}

export function Form({ children, ...props }: FormProps) {
  return <Container {...props}>{children}</Container>;
}
