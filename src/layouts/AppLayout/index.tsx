import { ReactNode } from "react";
import { Container } from "./styles";
import { Header } from "~/components/layout-components/Header";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Container>
      <Header />

      <main>
        <div className="container">{children}</div>
      </main>
    </Container>
  );
}
