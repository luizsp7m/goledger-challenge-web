import { ArrowLeft } from "@phosphor-icons/react";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";

interface GoBackButtonProps {
  goBackTo: string;
}

export function GoBackButton({ goBackTo }: GoBackButtonProps) {
  const navigate = useNavigate();

  function handleGoBackTo() {
    navigate(goBackTo);
  }

  return (
    <Container onClick={handleGoBackTo}>
      <ArrowLeft weight="bold" />
      <span>Voltar</span>
    </Container>
  );
}
