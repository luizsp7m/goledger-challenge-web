import ReactLoading from "react-loading";

import { Container } from "./styles";
import { theme } from "~/styles/theme";

export function TableLoading() {
  return (
    <Container>
      <ReactLoading
        width={20}
        height={20}
        type="spinningBubbles"
        color={theme["text-color-secondary"]}
      />

      <span>Carregando dados da tabela</span>
    </Container>
  );
}
