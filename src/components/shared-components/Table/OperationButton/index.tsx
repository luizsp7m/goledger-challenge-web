import { Eye, Pen, Trash } from "@phosphor-icons/react";
import { Container } from "./styles";
import { ButtonHTMLAttributes } from "react";

export interface OperationButtonProps {
  operationType: "view" | "update" | "delete";
  onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

export function OperationButton({
  operationType,
  onClick,
}: OperationButtonProps) {
  return (
    <Container type="button" onClick={onClick} $operationType={operationType}>
      {operationType === "view" && <Eye width={16} height={16} weight="bold" />}

      {operationType === "update" && (
        <Pen width={16} height={16} weight="bold" />
      )}

      {operationType === "delete" && (
        <Trash width={16} height={16} weight="bold" />
      )}
    </Container>
  );
}
