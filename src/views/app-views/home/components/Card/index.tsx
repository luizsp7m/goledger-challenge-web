import { MusicNotes, Playlist, Queue, User } from "@phosphor-icons/react";
import { Container } from "./styles";

interface CardProps {
  assetType: "artist" | "album" | "song" | "playlist";
  title: string;
  subtitle?: string;
}

export function Card({ assetType, title, subtitle }: CardProps) {
  return (
    <Container>
      <div className="icon-container">
        {assetType === "artist" && <User weight="bold" />}
        {assetType === "album" && <Queue weight="bold" />}
        {assetType === "song" && <MusicNotes weight="bold" />}
        {assetType === "playlist" && <Playlist weight="bold" />}
      </div>

      <div className="body">
        <span className="title">{title}</span>
        {subtitle && <span className="subtitle">{subtitle}</span>}
      </div>
    </Container>
  );
}
