import { useLazyGetArtistsQuery } from "~/store/services/artistsApiSlice";
import { Container } from "./styles";
import { useLazyGetAlbumsQuery } from "~/store/services/albumsApiSlice";
import { useLazyGetPlaylistsQuery } from "~/store/services/playlistsApiSlice";

import { useLazyGetSongsQuery } from "~/store/services/songsApiSlice";
import { useEffect, useState } from "react";
import { Summary } from "./components/Summary";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const [getArtists, { data: artistsResponse }] = useLazyGetArtistsQuery();
  const [getAlbums, { data: albumsResponse }] = useLazyGetAlbumsQuery();
  const [getSongs, { data: songsResponse }] = useLazyGetSongsQuery();
  const [getPlaylists, { data: playlistsResponse }] =
    useLazyGetPlaylistsQuery();

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

  if (isLoading) return null;

  return (
    <Container>
      <Summary
        artists={artistsResponse?.artists}
        albums={albumsResponse?.albums}
        songs={songsResponse?.songs}
        playlists={playlistsResponse?.playlists}
      />

      {/* <SectionContainer>
        <h3>Artistas</h3>

        <SectionItems>
          {artistsResponse?.artists
            .filter((_, index) => index < 10)
            .map((artist) => (
              <Card
                key={artist.id}
                assetType="artist"
                title={artist.name}
                subtitle={artist.country}
              />
            ))}
        </SectionItems>
      </SectionContainer>

      <SectionContainer>
        <h3>Álbuns</h3>

        <SectionItems>
          {albumsResponse?.albums
            .filter((_, index) => index < 10)
            .map((album) => (
              <Card
                key={album.id}
                assetType="album"
                title={album.name}
                subtitle={album.year + ""}
              />
            ))}
        </SectionItems>
      </SectionContainer>

      <SectionContainer>
        <h3>Músicas</h3>

        <SectionItems>
          {songsResponse?.songs
            .filter((_, index) => index < 10)
            .map((song) => (
              <Card key={song.id} assetType="song" title={song.name} />
            ))}
        </SectionItems>
      </SectionContainer>

      <SectionContainer>
        <h3>Playlists</h3>

        <SectionItems>
          {playlistsResponse?.playlists
            .filter((_, index) => index < 10)
            .map((playlist) => (
              <Card
                key={playlist.id}
                assetType="playlist"
                title={playlist.name}
              />
            ))}
        </SectionItems>
      </SectionContainer> */}
    </Container>
  );
}
