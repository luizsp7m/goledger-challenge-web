import { useMemo } from "react";
import { Artist } from "~/types/Artist";
import { mapObjectsToKeys } from "~/utils/mapObjectsToKeys";

export function useArtistsById(artists: Artist[] = []) {
  const artistsById = useMemo(() => {
    return mapObjectsToKeys(artists);
  }, [artists]);

  return { artistsById };
}
