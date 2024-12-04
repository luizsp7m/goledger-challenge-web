import { forwardRef, InputHTMLAttributes } from "react";
import { CustomInput } from "./styles";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <CustomInput ref={ref} {...props} />;
});
