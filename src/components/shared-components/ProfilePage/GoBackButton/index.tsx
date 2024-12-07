import { ArrowLeft } from "@phosphor-icons/react";
import { Container } from "./styles";
import { useNavigate } from "react-router-dom";

export function GoBackButton() {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(-1)}>
      <ArrowLeft weight="bold" />
      <span>Voltar</span>
    </Container>
  );
}
