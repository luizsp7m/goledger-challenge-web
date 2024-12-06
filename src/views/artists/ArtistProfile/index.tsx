import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLazyGetAlbumsByArtistQuery } from "~/store/services/albumsApiSlice";
import { useLazyGetArtistQuery } from "~/store/services/artistsApiSlice";

export default function ArtistProfile() {
  const { id: artistId } = useParams();

  const [getArtist, { data: artistResponse }] = useLazyGetArtistQuery();

  const [getAlbumsByArtist, { data: albumsByArtistResponse }] =
    useLazyGetAlbumsByArtistQuery();

  console.log(artistResponse);
  console.log(albumsByArtistResponse);

  useEffect(() => {
    if (!artistId) return;

    getArtist({ artistId }).unwrap();
    getAlbumsByArtist({ artistId }).unwrap();
  }, [artistId]);

  return <h1>OK</h1>;
}
