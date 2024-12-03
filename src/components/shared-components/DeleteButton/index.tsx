import { Trash } from "@phosphor-icons/react";
import { Container } from "./styles";

interface DeleteButtonProps {
  handleDelete: () => void;
}

export function DeleteButton({ handleDelete }: DeleteButtonProps) {
  return (
    <Container
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        handleDelete();
      }}
    >
      <Trash width={16} height={16} weight="bold" />
    </Container>
  );
}
