import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";
import { useLazyGetPlaylistQuery } from "~/store/services/playlistsApiSlice";
import { useLazyGetSongsQuery } from "~/store/services/songsApiSlice";
import { SongItem } from "~/components/shared-components/ProfilePage/SongItem";
import { GoBackButton } from "~/components/shared-components/ProfilePage/GoBackButton";
import { ProfilePage } from "~/components/shared-components/ProfilePage";
import { truncateText } from "~/utils/truncateText";
import { useLazyGetAlbumsQuery } from "~/store/services/albumsApiSlice";
import { useLazyGetArtistsQuery } from "~/store/services/artistsApiSlice";
import { useArtistsById } from "~/hooks/useArtistsById";
import { useAlbumsById } from "~/hooks/useAlbumsById";
import { findArtistBySongId } from "~/utils/findArtistByAlbumId";
import { findAlbumByAlbumId } from "~/utils/findAlbumByAlbumId";

export default function PlaylistProfile() {
  const [isLoadingInformation, setIsLoadingInformation] = useState(true);

  const { id: playlistId } = useParams();

  const [getPlaylist, { data: playlistResponse }] = useLazyGetPlaylistQuery();
  const [getSongs, { data: songsResponse }] = useLazyGetSongsQuery();
  const [getAlbums, { data: albumsResponse }] = useLazyGetAlbumsQuery();
  const [getArtists, { data: artistsResponse }] = useLazyGetArtistsQuery();

  const playlistSongs = useMemo(() => {
    if (playlistResponse && songsResponse) {
      return songsResponse.songs.filter((song) =>
        playlistResponse.songIds.includes(song.id)
      );
    }

    return [];
  }, [playlistResponse, songsResponse]);

  const { albumsById } = useAlbumsById(albumsResponse?.albums);
  const { artistsById } = useArtistsById(artistsResponse?.artists);

  async function fetchInformation(playlistId: string) {
    try {
      await Promise.all([
        getPlaylist({ playlistId }).unwrap(),
        getSongs().unwrap(),
        getAlbums().unwrap(),
        getArtists().unwrap(),
      ]);
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
      <ErrorMessage
        message="Não foi possível obter todos as informações da playlist"
        showRedirectToHomeButton
      />
    );
  }

  return (
    <ProfilePage.Container>
      <GoBackButton />

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

          {playlistSongs.length === 0 ? (
            <ProfilePage.Subtitle
              subtitle={`Nenhuma música adicionada na playlist`}
            />
          ) : (
            <ProfilePage.SongList>
              {playlistSongs.map((song, index) => (
                <SongItem
                  key={song.id}
                  order={index + 1}
                  song={song}
                  album={findAlbumByAlbumId({
                    albumId: song.albumId,
                    albumsById,
                  })}
                  artist={findArtistBySongId({
                    albumId: song.albumId,
                    albumsById,
                    artistsById,
                  })}
                />
              ))}
            </ProfilePage.SongList>
          )}
        </ProfilePage.SongSection>
      )}
    </ProfilePage.Container>
  );
}
