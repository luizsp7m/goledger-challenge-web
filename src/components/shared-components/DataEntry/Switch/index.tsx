import { forwardRef, InputHTMLAttributes } from "react";
import { Container } from "./styles";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <Container>
        <input ref={ref} type="checkbox" {...props} />
        <label>{label}</label>
      </Container>
    );
  }
);
