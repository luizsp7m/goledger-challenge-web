import { Container } from "./styles";

interface ToolbarProps {
  title: string;
  handleOpenModalForm: () => void;
}

export function Toolbar({ title, handleOpenModalForm }: ToolbarProps) {
  return (
    <Container>
      <h3>{title}</h3>

      <button type="button" onClick={() => handleOpenModalForm()}>
        Adicionar
      </button>
    </Container>
  );
}
