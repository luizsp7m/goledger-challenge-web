import { MagnifyingGlass } from "@phosphor-icons/react";
import { Container } from "./styles";
import { ButtonHTMLAttributes, forwardRef, InputHTMLAttributes } from "react";

interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
  buttonType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  ({ buttonType = "button", ...props }, ref) => {
    return (
      <Container>
        <input ref={ref} type="text" {...props} />

        <button type={buttonType}>
          <MagnifyingGlass size={16} weight="bold" />
        </button>
      </Container>
    );
  }
);
