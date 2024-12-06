import { Queue } from "@phosphor-icons/react";
import { Container } from "./styles";

interface AlbumItemProps {
  name: string;
  year: number;
}

export function AlbumItem({ name, year }: AlbumItemProps) {
  return (
    <Container>
      <div className="icon-wrapper">
        <Queue weight="bold" />
      </div>

      <div className="album-information">
        <h5>{name}</h5>
        <span>{year}</span>
      </div>
    </Container>
  );
}
