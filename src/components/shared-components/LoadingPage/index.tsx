import { Container } from "./styles";

interface LoadingPagProps {
  message?: string;
}

export function LoadingPage({ message }: LoadingPagProps) {
  return <Container>{message ?? "Loading..."}</Container>;
}
