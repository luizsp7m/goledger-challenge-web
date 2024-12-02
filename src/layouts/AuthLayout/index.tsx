import { ReactNode } from "react";
import { Container } from "./styles";
import { useAppDispatch } from "~/store/hooks/useAppDispatch";
import { login } from "~/store/slices/authSlice";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <h1>AuthLayoutWrapper</h1>
      <main>{children}</main>
      <button onClick={() => dispatch(login())}>SignIn</button>
    </Container>
  );
}
