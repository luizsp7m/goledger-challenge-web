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
      <Table
        onSelectRow={(song) => handleSelectSong(song)}
        data={songsData?.songs ?? []}
        columns={[
          { dataIndex: "name", title: "Música" },
          {
            title: "",
            width: 64,
            render: (song) =>
              selectedSongIds.includes(song.id) && (
                <Check size={16} weight="bold" />
              ),
          },
        ]}
      />
    </Container>
  );
}
