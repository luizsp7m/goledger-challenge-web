import { forwardRef, InputHTMLAttributes } from "react";
import { CustomInput } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <CustomInput ref={ref} {...props} />;
});
