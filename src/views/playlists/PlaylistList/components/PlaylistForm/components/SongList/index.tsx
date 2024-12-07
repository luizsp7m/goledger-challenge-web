import { Container, SongsQuantityText } from "./styles";
import { useGetSongsQuery } from "~/store/services/songsApiSlice";
import { Check } from "@phosphor-icons/react";
import { Song } from "~/types/Song";
import { Table } from "~/components/shared-components/Table";
import { InputSearch } from "~/components/shared-components/DataEntry/InputSearch";
import { Fragment, useMemo, useState } from "react";

interface SongListProps {
  selectedSongIds: string[];
  handleSelectSong: (song: Song) => void;
}

export function SongList({ selectedSongIds, handleSelectSong }: SongListProps) {
  const [searchSongValue, setSearchSongValue] = useState("");

  const { data: songsResponse } = useGetSongsQuery();

  const filteredSongs = useMemo(() => {
    if (!songsResponse?.songs) return [];

    if (!searchSongValue) return songsResponse.songs;

    return songsResponse.songs.filter((song) =>
      song.name.toLowerCase().includes(searchSongValue)
    );
  }, [searchSongValue, songsResponse]);

  return (
    <Fragment>
      <InputSearch
        onChange={(e) =>
          setSearchSongValue(e.target.value.trim().toLowerCase())
        }
      />

      <Container>
        <Table
          onSelectRow={(song) => handleSelectSong(song)}
          data={filteredSongs}
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

      <SongsQuantityText>
        Quantidade de músicas selecionadas: {selectedSongIds.length}
      </SongsQuantityText>
    </Fragment>
  );
}
