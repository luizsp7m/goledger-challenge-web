import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";
import { useLazyGetPlaylistQuery } from "~/store/services/playlistsApiSlice";
import { useLazyGetSongsQuery } from "~/store/services/songsApiSlice";
import { SongItem } from "~/components/shared-components/ProfilePage/SongItem";
import { GoBackButton } from "~/components/shared-components/ProfilePage/GoBackButton";
import { ProfilePage } from "~/components/shared-components/ProfilePage";

export default function PlaylistProfile() {
  const [isLoadingInformation, setIsLoadingInformation] = useState(true);

  const { id: playlistId } = useParams();

  const [getPlaylist, { data: playlistResponse }] = useLazyGetPlaylistQuery();
  const [getSongs, { data: songsResponse }] = useLazyGetSongsQuery();

  async function fetchInformation(playlistId: string) {
    try {
      await getPlaylist({ playlistId }).unwrap();
      await getSongs().unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingInformation(false);
    }
  }

  useEffect(() => {
    if (playlistId) {
      fetchInformation(playlistId);
    }
  }, [playlistId]);

  if (isLoadingInformation) {
    return <DataLoading />;
  }

  if (!playlistResponse || !songsResponse) {
    return (
      <ErrorMessage message="Não foi possível obter todos as informações da playlist" />
    );
  }

  return (
    <ProfilePage.Container>
      <GoBackButton goBackTo="/playlists" />

      {songsResponse.songs.length > 0 && (
        <ProfilePage.SongSection>
          <ProfilePage.Title
            title={`Músicas da playlist ${playlistResponse.name}`}
          />

          <ProfilePage.Subtitle
            subtitle={`Playlist ${
              playlistResponse.private ? "privada" : "pública"
            }`}
          />

          <ProfilePage.SongList>
            {songsResponse.songs.map((song, index) => (
              <SongItem key={song.id} order={index + 1} name={song.name} />
            ))}
          </ProfilePage.SongList>
        </ProfilePage.SongSection>
      )}
    </ProfilePage.Container>
  );
}
