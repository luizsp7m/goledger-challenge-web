import { useLazyGetArtistsQuery } from "~/store/services/artistsApiSlice";
import { Container } from "./styles";
import { useLazyGetAlbumsQuery } from "~/store/services/albumsApiSlice";
import { useLazyGetPlaylistsQuery } from "~/store/services/playlistsApiSlice";
import { useLazyGetSongsQuery } from "~/store/services/songsApiSlice";
import { useEffect, useMemo, useState } from "react";
import { Summary } from "./components/Summary";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { AlbumItem } from "~/components/shared-components/ProfilePage/AlbumItem";
import { ProfilePage } from "~/components/shared-components/ProfilePage";
import { SongItem } from "~/components/shared-components/ProfilePage/SongItem";
import { ArtistItem } from "~/components/shared-components/ProfilePage/ArtistItem";
import { getArraySlice } from "./utils/getArraySlice";
import { useAlbumsById } from "~/hooks/useAlbumsById";
import { useArtistsById } from "~/hooks/useArtistsById";
import { findAlbumByAlbumId } from "~/utils/findAlbumByAlbumId";
import { findArtistBySongId } from "~/utils/findArtistByAlbumId";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [getArtists, { data: artistsResponse, isError: artistsIsError }] =
    useLazyGetArtistsQuery();

  const [getAlbums, { data: albumsResponse, isError: albumsIsError }] =
    useLazyGetAlbumsQuery();

  const [getSongs, { data: songsResponse, isError: songsIsError }] =
    useLazyGetSongsQuery();

  const [getPlaylists, { data: playlistsResponse }] =
    useLazyGetPlaylistsQuery();

  const { albumsById } = useAlbumsById(albumsResponse?.albums);
  const { artistsById } = useArtistsById(artistsResponse?.artists);

  const artistList = useMemo(() => {
    if (!artistsResponse) return [];
    return getArraySlice(artistsResponse.artists, 4);
  }, [artistsResponse]);

  const albumList = useMemo(() => {
    if (!albumsResponse) return [];
    return getArraySlice(albumsResponse.albums, 6);
  }, [albumsResponse]);

  const songList = useMemo(() => {
    if (!songsResponse) return [];
    return getArraySlice(songsResponse.songs, 10);
  }, [songsResponse]);

  useEffect(() => {
    Promise.all([
      getArtists().unwrap(),
      getAlbums().unwrap(),
      getSongs().unwrap(),
      getPlaylists().unwrap(),
    ]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <DataLoading />;

  return (
    <Container>
      <Summary
        artists={artistsResponse?.artists}
        albums={albumsResponse?.albums}
        songs={songsResponse?.songs}
        playlists={playlistsResponse?.playlists}
      />

      <>
        {artistsIsError && (
          <ErrorMessage
            message="Ocorreu um erro ao obter os artistas"
            alternativeStyle
          />
        )}

        {artistList.length > 0 && (
          <ProfilePage.ArtistSection>
            <ProfilePage.Title title="Os melhores artistas" />

            <ProfilePage.ArtistList>
              {artistList.map((artist) => (
                <ArtistItem key={artist.id} artist={artist} />
              ))}
            </ProfilePage.ArtistList>
          </ProfilePage.ArtistSection>
        )}
      </>

      <>
        {albumsIsError && (
          <ErrorMessage
            message="Ocorreu um erro ao obter os álbuns"
            alternativeStyle
          />
        )}

        {albumList.length > 0 && (
          <ProfilePage.AlbumSection>
            <ProfilePage.Title title="Os melhores álbuns" />

            <ProfilePage.AlbumList>
              {albumList.map((album) => (
                <AlbumItem
                  key={album.id}
                  album={album}
                  artistName={
                    artistsById[album.artistId]?.name ??
                    "Artista não encontrado"
                  }
                />
              ))}
            </ProfilePage.AlbumList>
          </ProfilePage.AlbumSection>
        )}
      </>

      <>
        {songsIsError && (
          <ErrorMessage
            message="Ocorreu um erro ao obter as músicas"
            alternativeStyle
          />
        )}

        {songList.length > 0 && (
          <ProfilePage.SongSection>
            <ProfilePage.Title title="As mais tocadas da semana" />

            <ProfilePage.SongList>
              {songList.map((song, index) => {
                return (
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
                );
              })}
            </ProfilePage.SongList>
          </ProfilePage.SongSection>
        )}
      </>
    </Container>
  );
}
