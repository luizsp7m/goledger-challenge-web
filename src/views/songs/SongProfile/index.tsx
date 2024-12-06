import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";
import { useLazyGetAlbumQuery } from "~/store/services/albumsApiSlice";
import { useLazyGetArtistQuery } from "~/store/services/artistsApiSlice";
import { useLazyGetSongQuery } from "~/store/services/songsApiSlice";
import { GoBackButton } from "~/components/shared-components/GoBackButton";
import { ArtistItem } from "~/components/shared-components/ArtistItem";
import { AlbumItem } from "~/components/shared-components/AlbumItem";
import { SongItem } from "~/components/shared-components/SongItem";

import {
  AlbumList,
  AlbumSection,
  Container,
  SongList,
  SongSection,
} from "./styles";

export default function SongProfile() {
  const [isLoadingInformation, setIsLoadingInformation] = useState(true);

  const { id: songId } = useParams();

  const [getSong, { data: songResponse }] = useLazyGetSongQuery();
  const [getAlbum, { data: albumResponse }] = useLazyGetAlbumQuery();
  const [getArtist, { data: artistResponse }] = useLazyGetArtistQuery();

  async function fetchInformation(songId: string) {
    try {
      const songResponse = await getSong({ songId }).unwrap();

      const albumResponse = await getAlbum({
        albumId: songResponse.albumId,
      }).unwrap();

      await getArtist({
        artistId: albumResponse.artistId,
      }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingInformation(false);
    }
  }

  useEffect(() => {
    if (songId) {
      fetchInformation(songId);
    }
  }, [songId]);

  if (isLoadingInformation) {
    return <DataLoading />;
  }

  if (!songResponse || !albumResponse || !artistResponse) {
    return (
      <ErrorMessage message="Não foi possível obter todos as informações do álbum" />
    );
  }

  return (
    <Container>
      <GoBackButton goBackTo="/songs" />

      <ArtistItem name={artistResponse.name} country={artistResponse.country} />

      <AlbumSection>
        <h2>Essa música é do álbum: </h2>

        <AlbumList>
          <AlbumItem
            key={albumResponse.id}
            name={albumResponse.name}
            year={albumResponse.year}
          />
        </AlbumList>
      </AlbumSection>

      <SongSection>
        <h2>Detalhes da música: </h2>

        <SongList>
          <SongItem
            key={songResponse.id}
            order={1}
            name={songResponse.name}
            albumName={albumResponse.name}
          />
        </SongList>
      </SongSection>
    </Container>
  );
}
