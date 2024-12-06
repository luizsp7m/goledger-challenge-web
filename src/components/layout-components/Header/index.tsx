import { Link, useLocation } from "react-router-dom";
import { Container, Overlay } from "./styles";
import { useEffect, useState } from "react";

import {
  List,
  MusicNotes,
  Playlist,
  Queue,
  Users,
} from "@phosphor-icons/react";

import {
  ALBUMS_PREFIX_PATH,
  ARTISTS_PREFIX_PATH,
  HOME_PREFIX_PATH,
  PLAYLISTS_PREFIX_PATH,
  SONGS_PREFIX_PATH,
} from "~/configs/AppConfig";

const NAV_ITEMS = [
  {
    title: "Artistas",
    route: ARTISTS_PREFIX_PATH,
    icon: <Users size={16} weight="bold" />,
  },

  {
    title: "Álbuns",
    route: ALBUMS_PREFIX_PATH,
    icon: <Queue size={16} weight="bold" />,
  },

  {
    title: "Músicas",
    route: SONGS_PREFIX_PATH,
    icon: <MusicNotes size={16} weight="bold" />,
  },

  {
    title: "Playlists",
    route: PLAYLISTS_PREFIX_PATH,
    icon: <Playlist size={16} weight="bold" />,
  },
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
        <Link to={HOME_PREFIX_PATH}>
          <h1>GoLedger Challenge</h1>
        </Link>

        <nav className={menuIsOpen ? "show" : ""}>
          {NAV_ITEMS.map((navItem, index) => {
            return (
              <Link
                key={index}
                to={navItem.route}
                className={pathname === navItem.route ? "active-link" : ""}
              >
                {navItem.icon}
                {navItem.title}
              </Link>
            );
          })}
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
