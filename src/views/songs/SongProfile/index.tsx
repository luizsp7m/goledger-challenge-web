import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";
import { useLazyGetAlbumQuery } from "~/store/services/albumsApiSlice";
import { useLazyGetArtistQuery } from "~/store/services/artistsApiSlice";
import { useLazyGetSongQuery } from "~/store/services/songsApiSlice";
import { GoBackButton } from "~/components/shared-components/ProfilePage/GoBackButton";
import { ArtistItem } from "~/components/shared-components/ProfilePage/ArtistItem";
import { AlbumItem } from "~/components/shared-components/ProfilePage/AlbumItem";
import { SongItem } from "~/components/shared-components/ProfilePage/SongItem";
import { ProfilePage } from "~/components/shared-components/ProfilePage";
import { truncateText } from "~/utils/truncateText";

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
      <ErrorMessage
        message="Não foi possível obter todos as informações da música"
        showRedirectToHomeButton
      />
    );
  }

  return (
    <ProfilePage.Container>
      <GoBackButton />

      <ProfilePage.Heading
        heading={`Você está vendo a página da música ${truncateText(
          songResponse.name,
          48
        )}`}
      />

      <ArtistItem artist={artistResponse} />

      <ProfilePage.AlbumSection>
        <ProfilePage.Title title="Informações do álbum" />

        <ProfilePage.AlbumList>
          <AlbumItem key={albumResponse.id} album={albumResponse} />
        </ProfilePage.AlbumList>
      </ProfilePage.AlbumSection>

      <ProfilePage.SongSection>
        <ProfilePage.Title title="Detalhes da música" />

        <ProfilePage.SongList>
          <SongItem
            key={songResponse.id}
            order={1}
            albumName={albumResponse.name}
            song={songResponse}
          />
        </ProfilePage.SongList>
      </ProfilePage.SongSection>
    </ProfilePage.Container>
  );
}
