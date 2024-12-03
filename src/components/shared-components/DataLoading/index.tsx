import ReactLoading from "react-loading";

import { Container } from "./styles";
import { theme } from "~/styles/theme";

interface DataLoadingProps {
  message?: string;
}

export function DataLoading({ message = "Carregando..." }: DataLoadingProps) {
  return (
    <Container>
      <ReactLoading
        type="spinningBubbles"
        width={32}
        height={32}
        color={theme["text-color-secondary"]}
      />
      <span>{message}</span>
    </Container>
  );
}
