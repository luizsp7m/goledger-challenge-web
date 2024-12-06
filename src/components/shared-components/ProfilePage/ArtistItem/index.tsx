import { User } from "@phosphor-icons/react";
import { Container } from "./styles";
import { useNavigateTo } from "~/hooks/useNavigateTo";
import { ARTISTS_PREFIX_PATH } from "~/configs/AppConfig";
import { Artist } from "~/types/Artist";

interface ArtistItemProps {
  artist: Artist;
  subtitle?: string;
}

export function ArtistItem({ artist, subtitle }: ArtistItemProps) {
  const { handleNavigateTo } = useNavigateTo();

  return (
    <Container
      onClick={() => handleNavigateTo(`${ARTISTS_PREFIX_PATH}/${artist.id}`)}
    >
      <div className="avatar">
        <User weight="bold" />
      </div>

      <div className="information">
        <h3>{artist.name}</h3>
        <h5>{artist.country}</h5>
        {subtitle && <span>{subtitle}</span>}
      </div>
    </Container>
  );
}
