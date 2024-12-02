import { Link } from "react-router-dom";
import { Container } from "./styles";
import { useAppDispatch } from "~/store/hooks/useAppDispatch";
import { logout } from "~/store/slices/authSlice";

export function Header() {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Container>
      <header>
        <h1>GoLedger Challenge</h1>

        <nav>
          <Link to={"/artists"}>Artistas</Link>
          <Link to={"/songs"}>Músicas</Link>
          <Link to={"/albums"}>Álbuns</Link>
          <Link to={"/playlists"}>Playlists</Link>
        </nav>
      </header>
    </Container>
  );
}
