import { VinylRecord } from "@phosphor-icons/react";
import { Container } from "./styles";
import { useNavigateTo } from "~/hooks/useNavigateTo";
import { ALBUMS_PREFIX_PATH } from "~/configs/AppConfig";
import { Album } from "~/types/Album";

interface AlbumItemProps {
  album: Album;
  artistName?: string;
}

export function AlbumItem({ album, artistName }: AlbumItemProps) {
  const { handleNavigateTo } = useNavigateTo();

  return (
    <Container
      onClick={() => handleNavigateTo(`${ALBUMS_PREFIX_PATH}/${album.id}`)}
    >
      <div className="icon-wrapper">
        <VinylRecord />
      </div>

      <div className="album-information">
        <h5 className="truncate">{album.name}</h5>

        <span className="truncate">
          {artistName ? artistName : `Lançado em ${album.year}`}
        </span>
      </div>
    </Container>
  );
}
