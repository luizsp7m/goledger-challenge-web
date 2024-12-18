import { Album } from "~/types/Album";

interface FindAlbumByAlbumIdProps {
  albumId: string;
  albumsById: { [key: string]: Album };
}

export function findAlbumByAlbumId({
  albumId,
  albumsById,
}: FindAlbumByAlbumIdProps): Album | null {
  if (albumsById[albumId]) {
    return albumsById[albumId];
  } else {
    return null;
  }
}
