import { Container } from "./styles";

interface TableEmptyProps {
  colSpan: number;
}

export function TableEmpty({ colSpan }: TableEmptyProps) {
  return (
    <Container>
      <td colSpan={colSpan}>Nenhum registro encontrado</td>
    </Container>
  );
}
