import { Container } from "./styles";

import {
  MusicNotes,
  Playlist,
  VinylRecord,
  Users,
} from "@phosphor-icons/react";

interface SummaryItemProps {
  assetType: "artists" | "albums" | "songs" | "playlists";
  singleValue: string;
  pluralValue: string;
  quantity: number;
}

export function SummaryItem({
  assetType,
  singleValue,
  pluralValue,
  quantity,
}: SummaryItemProps) {
  return (
    <Container>
      <div>
        {assetType === "artists" && <Users weight="bold" />}
        {assetType === "albums" && <VinylRecord weight="bold" />}
        {assetType === "songs" && <MusicNotes weight="bold" />}
        {assetType === "playlists" && <Playlist weight="bold" />}
      </div>

      <span className="truncate">
        {quantity === 0 && `Não há nada aqui`}
        {quantity === 1 && `${quantity} ${singleValue.toLowerCase()}`}
        {quantity > 1 && `${quantity} ${pluralValue.toLowerCase()}`}
      </span>
    </Container>
  );
}
