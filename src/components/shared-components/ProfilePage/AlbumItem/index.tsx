import { Queue } from "@phosphor-icons/react";
import { Container } from "./styles";
import { useNavigateTo } from "~/hooks/useNavigateTo";
import { ALBUMS_PREFIX_PATH } from "~/configs/AppConfig";
import { Album } from "~/types/Album";

interface AlbumItemProps {
  album: Album;
}

export function AlbumItem({ album }: AlbumItemProps) {
  const { handleNavigateTo } = useNavigateTo();

  return (
    <Container
      onClick={() => handleNavigateTo(`${ALBUMS_PREFIX_PATH}/${album.id}`)}
    >
      <div className="icon-wrapper">
        <Queue weight="bold" />
      </div>

      <div className="album-information">
        <h5 className="truncate">{album.name}</h5>
        <span className="truncate">{album.year}</span>
      </div>
    </Container>
  );
}
