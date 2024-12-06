import { User } from "@phosphor-icons/react";
import { Container } from "./styles";

interface ArtistItemProps {
  name: string;
  country: string;
  subtitle: string;
}

export function ArtistItem({ name, country, subtitle }: ArtistItemProps) {
  return (
    <Container>
      <div className="avatar">
        <User weight="bold" />
      </div>

      <div className="information">
        <h3>{name}</h3>
        <h5>{country}</h5>
        <span>{subtitle}</span>
      </div>
    </Container>
  );
}
