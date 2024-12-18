import { MusicNotes } from "@phosphor-icons/react";
import { Container } from "./styles";
import { Song } from "~/types/Song";
import { Album } from "~/types/Album";
import { Artist } from "~/types/Artist";
import { Link } from "react-router-dom";
import { ALBUMS_PREFIX_PATH, ARTISTS_PREFIX_PATH } from "~/configs/AppConfig";

interface SongItemProps {
  song: Song;
  order: number;
  album: Album | null;
  artist: Artist | null;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randomTime() {
  const minute = getRandomInt(5);
  const seconds = getRandomInt(60);

  return `${minute}:${(seconds + "").padStart(2, "0")}`;
}

export function SongItem({ song, order, album, artist }: SongItemProps) {
  return (
    <Container>
      <div className="grid-item-1">
        <span>{order}. </span>

        <div className="icon-wrapper">
          <MusicNotes weight="bold" />
        </div>

        <div className="song-information">
          <h5 className="truncate">{song.name}</h5>

          {artist ? (
            <Link
              to={`${ARTISTS_PREFIX_PATH}/${artist.id}`}
              className="truncate"
            >
              {artist.name}
            </Link>
          ) : (
            <span className="truncate">Artista desconhecido</span>
          )}
        </div>
      </div>

      <div className="grid-item-2">
        {album ? (
          <Link to={`${ALBUMS_PREFIX_PATH}/${album.id}`} className="truncate">
            {album.name}
          </Link>
        ) : (
          <span className="truncate">Álbum desconhecido</span>
        )}
      </div>

      <div className="grid-item-3">
        <span className="truncate">{randomTime()}</span>
      </div>
    </Container>
  );
}
