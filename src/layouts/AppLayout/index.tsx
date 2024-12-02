import { ReactNode } from "react";
import { Container } from "./styles";
import { useAppDispatch } from "~/store/hooks/useAppDispatch";
import { logout } from "~/store/slices/authSlice";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <h1>AppLayoutWrapper</h1>
      <main>{children}</main>
      <button onClick={() => dispatch(logout())}>SignOut</button>
    </Container>
  );
}
