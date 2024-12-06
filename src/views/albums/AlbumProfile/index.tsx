import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";
import { useLazyGetAlbumQuery } from "~/store/services/albumsApiSlice";
import { useLazyGetArtistQuery } from "~/store/services/artistsApiSlice";
import { useLazyGetSongsByAlbumsQuery } from "~/store/services/songsApiSlice";
import {
  AlbumList,
  AlbumSection,
  Container,
  SongList,
  SongSection,
} from "./styles";
import { GoBackButton } from "~/components/shared-components/GoBackButton";
import { ArtistItem } from "~/components/shared-components/ArtistItem";
import { SongItem } from "~/components/shared-components/SongItem";
import { AlbumItem } from "~/components/shared-components/AlbumItem";

export default function AlbumProfile() {
  const [isLoadingInformation, setIsLoadingInformation] = useState(true);

  const { id: albumId } = useParams();

  const [getArtist, { data: artistResponse }] = useLazyGetArtistQuery();
  const [getAlbum, { data: albumResponse }] = useLazyGetAlbumQuery();
  const [getSongsByAlbums, { data: songsByAlbumsResponse }] =
    useLazyGetSongsByAlbumsQuery();

  async function fetchInformation(albumId: string) {
    try {
      const albumResponse = await getAlbum({ albumId }).unwrap();
      await getArtist({ artistId: albumResponse.artistId }).unwrap();
      await getSongsByAlbums({ albumIds: [albumResponse.id] }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingInformation(false);
    }
  }

  useEffect(() => {
    if (albumId) {
      fetchInformation(albumId);
    }
  }, [albumId]);

  if (isLoadingInformation) {
    return <DataLoading />;
  }

  if (!albumResponse || !artistResponse || !songsByAlbumsResponse) {
    return (
      <ErrorMessage message="Não foi possível obter todos as informações do álbum" />
    );
  }

  return (
    <Container>
      <GoBackButton goBackTo="/albums" />

      <ArtistItem
        name={artistResponse.name}
        country={artistResponse.country}
        subtitle="aaa"
      />

      <AlbumSection>
        <h2>Detalhes do álbum: </h2>

        <AlbumList>
          <AlbumItem
            key={albumResponse.id}
            name={albumResponse.name}
            year={albumResponse.year}
          />
        </AlbumList>
      </AlbumSection>

      {songsByAlbumsResponse.songs.length > 0 && (
        <SongSection>
          <h2>Músicas do álbum: </h2>

          <SongList>
            {songsByAlbumsResponse.songs.map((song, index) => (
              <SongItem
                key={song.id}
                order={index + 1}
                name={song.name}
                albumName={albumResponse.name}
              />
            ))}
          </SongList>
        </SongSection>
      )}
    </Container>
  );
}
