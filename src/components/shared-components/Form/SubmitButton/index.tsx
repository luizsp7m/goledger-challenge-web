import ReactLoading from "react-loading";

import { Container } from "./styles";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export function SubmitButton({ isSubmitting }: SubmitButtonProps) {
  return (
    <Container type="submit" disabled={isSubmitting}>
      {isSubmitting && (
        <ReactLoading type="spinningBubbles" width={16} height={16} />
      )}
      Salvar
    </Container>
  );
}
