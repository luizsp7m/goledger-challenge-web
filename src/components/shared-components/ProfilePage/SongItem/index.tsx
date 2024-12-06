import { MusicNotes } from "@phosphor-icons/react";
import { Container } from "./styles";
import { Song } from "~/types/Song";
import { useNavigateTo } from "~/hooks/useNavigateTo";
import { SONGS_PREFIX_PATH } from "~/configs/AppConfig";

interface SongItemProps {
  song: Song;
  order: number;
  albumName?: string;
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function randomTime() {
  const minute = getRandomInt(5);
  const seconds = getRandomInt(60);

  return `${minute}:${(seconds + "").padStart(2, "0")}`;
}

export function SongItem({ song, order, albumName }: SongItemProps) {
  const { handleNavigateTo } = useNavigateTo();

  return (
    <Container
      onClick={() => handleNavigateTo(`${SONGS_PREFIX_PATH}/${song.id}`)}
    >
      <div className="left-side">
        <span>{order}. </span>

        <div className="icon-wrapper">
          <MusicNotes weight="bold" />
        </div>

        <div className="song-information">
          <h5>{song.name}</h5>
          {albumName && <span>{albumName}</span>}
        </div>
      </div>

      <div className="right-side">
        <span>{randomTime()}</span>
      </div>
    </Container>
  );
}
