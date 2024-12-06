import { MusicNotes } from "@phosphor-icons/react";
import { Container } from "./styles";

interface SongItemProps {
  order: number;
  name: string;
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

export function SongItem({ order, name, albumName }: SongItemProps) {
  return (
    <Container>
      <div className="left-side">
        <span>{order}. </span>

        <div className="icon-wrapper">
          <MusicNotes weight="bold" />
        </div>

        <div className="song-information">
          <h5>{name}</h5>
          {albumName && <span>{albumName}</span>}
        </div>
      </div>

      <div className="right-side">
        <span>{randomTime()}</span>
      </div>
    </Container>
  );
}
