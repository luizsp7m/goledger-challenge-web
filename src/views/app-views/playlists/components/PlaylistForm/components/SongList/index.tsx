import { FormLabel } from "~/components/shared-components/Form/FormLabel";
import { Container, SongItem, SongListContainer } from "./styles";
import { useGetSongsQuery } from "~/store/services/songsApiSlice";
import { MusicNotes } from "@phosphor-icons/react";
import { Song } from "~/types/Song";

interface SongListProps {
  selectedSongIds: string[];
  handleSelectSong: (song: Song) => void;
}

export function SongList({ selectedSongIds, handleSelectSong }: SongListProps) {
  const {
    data: songsData,
    isLoading: songsIsLoading,
    isError: songsIsError,
  } = useGetSongsQuery();

  return (
    <Container>
      {songsData && (
        <SongListContainer>
          {songsData.songs.map((song) => (
            <SongItem
              key={song.id}
              onClick={() => handleSelectSong(song)}
              $isSelected={selectedSongIds.includes(song.id)}
            >
              <div>
                <MusicNotes weight="bold" size={14} />
              </div>

              <span>{song.name}</span>
            </SongItem>
          ))}
        </SongListContainer>
      )}
    </Container>
  );
}
