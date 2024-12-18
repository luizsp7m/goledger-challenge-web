import { useMemo } from "react";
import { Album } from "~/types/Album";
import { mapObjectsToKeys } from "~/utils/mapObjectsToKeys";

export function useAlbumsById(albums: Album[] = []) {
  const albumsById = useMemo(() => {
    return mapObjectsToKeys(albums);
  }, [albums]);

  return { albumsById };
}
