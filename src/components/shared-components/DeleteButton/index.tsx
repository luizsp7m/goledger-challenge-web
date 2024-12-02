import { Trash } from "@phosphor-icons/react";
import { Container } from "./styles";

export function DeleteButton() {
  return (
    <Container type="button">
      <Trash width={16} height={16} weight="bold" />
    </Container>
  );
}
