import { DataLoading } from "~/components/shared-components/DataLoading";
import { Toolbar } from "~/components/shared-components/Toolbar";
import { useFormModal } from "~/hooks/useFormModal";
import { Playlist } from "~/types/Playlist";
import { PlaylistsTable } from "./components/PlaylistsTable";
import { useGetPlaylistsQuery } from "~/store/services/playlistsApiSlice";
import { Modal } from "~/components/shared-components/Modal";
import { PlaylistForm } from "./components/PlaylistForm";
import { useFilterDataFromQuery } from "~/hooks/useFilterDataFromQuery";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";

const sortByOptions = [
  { value: "name:asc", label: "Nome da playlist (A-Z)" },
  { value: "name:desc", label: "Nome da playlist (Z-A)" },
  { value: "lastUpdated:asc", label: "Atualização mais antiga" },
  { value: "lastUpdated:desc", label: "Atualização mais recente" },
];

export default function PlaylistsList() {
  const {
    data: playlistsData,
    isLoading: playlistsIsLoading,
    isFetching: playlistsIsFetching,
    isError: playlistsIsError,
  } = useGetPlaylistsQuery();

  const {
    formModalIsOpen,
    selectedItem,
    handleOpenFormModal,
    handleCloseFormModal,
  } = useFormModal<Playlist>();

  const { paginatedData, currentPage, totalPages, totalItems } =
    useFilterDataFromQuery({
      records: playlistsData?.playlists ?? [],
      searchField: "name",
    });

  return (
    <>
      <Toolbar
        title="Playlists"
        sortByOptions={sortByOptions}
        totalItems={totalItems}
        handleOpenModalForm={handleOpenFormModal}
      />

      {(playlistsIsLoading || (!playlistsData && playlistsIsFetching)) && (
        <DataLoading />
      )}

      {playlistsIsError && (
        <ErrorMessage message="Não foi possível carregar a lista de playlists" />
      )}

      {!playlistsIsLoading && !playlistsIsError && playlistsData && (
        <PlaylistsTable
          playlists={paginatedData}
          handleOpenFormModal={handleOpenFormModal}
          playlistsIsFetching={playlistsIsFetching}
          pagination={{ currentPage, totalPages }}
        />
      )}

      <Modal
        title="Playlist"
        isOpen={formModalIsOpen}
        handleCloseModal={handleCloseFormModal}
        maxWidth={640}
      >
        <PlaylistForm
          selectedPlaylist={selectedItem}
          handleCloseModal={handleCloseFormModal}
        />
      </Modal>
    </>
  );
}
