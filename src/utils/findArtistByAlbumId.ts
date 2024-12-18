import { Album } from "~/types/Album";
import { Artist } from "~/types/Artist";

interface FindArtistByAlbumIdProps {
  albumId: string;
  albumsById: { [key: string]: Album };
  artistsById: { [key: string]: Artist };
}

export function findArtistBySongId({
  albumId,
  albumsById,
  artistsById,
}: FindArtistByAlbumIdProps): Artist | null {
  if (albumsById[albumId] && artistsById[albumsById[albumId].artistId])
    return artistsById[albumsById[albumId].artistId];

  return null;
}
