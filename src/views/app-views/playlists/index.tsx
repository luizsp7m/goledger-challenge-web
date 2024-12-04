import { DataLoading } from "~/components/shared-components/DataLoading";
import { Toolbar } from "~/components/shared-components/Toolbar";
import { useFormModal } from "~/hooks/useFormModal";
import { Playlist } from "~/types/Playlist";
import { PlaylistsTable } from "./components/PlaylistsTable";
import { useGetPlaylistsQuery } from "~/store/services/playlistsApiSlice";
import { Modal } from "~/components/shared-components/Modal";
import { PlaylistForm } from "./components/PlaylistForm";

export default function PlaylistsPage() {
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

  return (
    <>
      <Toolbar title="Playlists" handleOpenModalForm={handleOpenFormModal} />

      {playlistsIsLoading && <DataLoading />}
      {playlistsIsError && <p>Failed to fetch user data</p>}

      {!playlistsIsLoading && playlistsData && (
        <PlaylistsTable
          playlists={playlistsData.playlists}
          handleOpenFormModal={handleOpenFormModal}
          playlistsIsFetching={playlistsIsFetching}
        />
      )}

      {!playlistsIsLoading && !playlistsData && <p>No data available</p>}

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
