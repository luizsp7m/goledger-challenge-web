import { ReactNode } from "react";
import { Container } from "./styles";
import { Header } from "~/components/layout-components/Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container>
      <Header />

      <main>
        <div className="container">{children}</div>
      </main>
    </Container>
  );
}
