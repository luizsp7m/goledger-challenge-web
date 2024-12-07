import { Props, GroupBase, SelectInstance } from "react-select";
import { CustomSelect } from "./styles";
import { forwardRef } from "react";
import { getReactSelectCustomStyles } from "~/styles/getReactSelectCustomStyles";

type SelectRef = SelectInstance<unknown, boolean, GroupBase<unknown>>;

export const Select = forwardRef<SelectRef, Props>(({ ...props }, ref) => {
  const customStyles = getReactSelectCustomStyles();

  return (
    <CustomSelect
      ref={ref}
      styles={customStyles}
      noOptionsMessage={() => <span>Nenhuma opção encontrada</span>}
      placeholder="Selecione uma opção"
      {...props}
    />
  );
});
