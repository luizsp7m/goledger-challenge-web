import ReactLoading from "react-loading";

import { Container } from "./styles";
import { theme } from "~/styles/theme";

export function LoadingPage() {
  return (
    <Container>
      <ReactLoading
        type="spin"
        width={48}
        height={48}
        color={theme["primary-color"]}
      />
    </Container>
  );
}
