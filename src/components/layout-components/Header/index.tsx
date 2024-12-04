import { Link, useLocation } from "react-router-dom";
import { Container, Overlay } from "./styles";
import { List } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { title: "Artistas", route: "/artists" },
  { title: "Álbuns", route: "/albums" },
  { title: "Músicas", route: "/songs" },
  { title: "Playlists", route: "/playlists" },
];

export function Header() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const { pathname } = useLocation();

  function handleCloseMenu() {
    setMenuIsOpen(false);
  }

  function handleToggleMenu() {
    setMenuIsOpen((prevState) => !prevState);
  }

  useEffect(() => {
    handleCloseMenu();
  }, [pathname]);

  return (
    <Container>
      <header>
        <h1>GoLedger Challenge</h1>

        <nav className={menuIsOpen ? "show" : ""}>
          {NAV_ITEMS.map((navItem, index) => (
            <Link
              key={index}
              to={navItem.route}
              className={pathname === navItem.route ? "active-link" : ""}
            >
              {navItem.title}
            </Link>
          ))}
        </nav>

        <button
          className="toggle-menu"
          type="button"
          onClick={handleToggleMenu}
        >
          <List width={24} height={24} />
        </button>

        <Overlay $isVisible={menuIsOpen} onClick={handleCloseMenu} />
      </header>
    </Container>
  );
}
