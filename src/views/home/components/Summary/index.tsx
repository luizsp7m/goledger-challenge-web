import { Artist } from "~/types/Artist";
import { SummaryItem } from "./components/SummaryItem";
import { Container } from "./styles";
import { Album } from "~/types/Album";
import { Song } from "~/types/Song";
import { Playlist } from "~/types/Playlist";

interface SummaryProps {
  artists?: Artist[];
  albums?: Album[];
  songs?: Song[];
  playlists?: Playlist[];
}

export function Summary({
  artists = [],
  albums = [],
  songs = [],
  playlists = [],
}: SummaryProps) {
  return (
    <Container>
      <SummaryItem
        assetType="artists"
        quantity={artists.length}
        singleValue="Artista"
        pluralValue="Artistas"
      />

      <SummaryItem
        assetType="albums"
        quantity={albums.length}
        singleValue="Álbum"
        pluralValue="Álbuns"
      />

      <SummaryItem
        assetType="songs"
        quantity={songs.length}
        singleValue="Música"
        pluralValue="Músicas"
      />

      <SummaryItem
        assetType="playlists"
        quantity={playlists.length}
        singleValue="Playlist"
        pluralValue="Playlists"
      />
    </Container>
  );
}
