import { Container } from "./styles";
import { useGetSongsQuery } from "~/store/services/songsApiSlice";
import { Check } from "@phosphor-icons/react";
import { Song } from "~/types/Song";
import { Table } from "~/components/shared-components/Table";

interface SongListProps {
  selectedSongIds: string[];
  handleSelectSong: (song: Song) => void;
}

export function SongList({ selectedSongIds, handleSelectSong }: SongListProps) {
  const {
    data: songsData,
    // isLoading: songsIsLoading,
    // isError: songsIsError,
  } = useGetSongsQuery();

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Música</th>
            <th style={{ width: 64 }}></th>
          </tr>
        </thead>

        <tbody>
          {songsData?.songs.map((song) => (
            <tr key={song.id} onClick={() => handleSelectSong(song)}>
              <td>{song.name}</td>

              <td>
                {selectedSongIds.includes(song.id) && (
                  <Check size={16} weight="bold" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
