import { Artist } from "~/types/Artist";
import { Container } from "./styles";

interface ToolbarProps {
  title: string;
  handleOpenModalForm: (artist: Artist | null) => void;
}

export function Toolbar({ title, handleOpenModalForm }: ToolbarProps) {
  return (
    <Container>
      <h3>{title}</h3>

      <button type="button" onClick={() => handleOpenModalForm(null)}>
        Adicionar
      </button>
    </Container>
  );
}
