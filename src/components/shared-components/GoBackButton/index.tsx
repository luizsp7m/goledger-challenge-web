import { ArrowLeft } from "@phosphor-icons/react";
import { Container } from "./styles";
import { useNavigateTo } from "~/hooks/useNavigateTo";

interface GoBackButtonProps {
  goBackTo: string;
}

export function GoBackButton({ goBackTo }: GoBackButtonProps) {
  const { handleNavigateTo } = useNavigateTo();

  return (
    <Container onClick={() => handleNavigateTo(goBackTo)}>
      <ArrowLeft weight="bold" />
      <span>Voltar</span>
    </Container>
  );
}
