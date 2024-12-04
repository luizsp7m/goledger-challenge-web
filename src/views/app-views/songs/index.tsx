import { DataLoading } from "~/components/shared-components/DataLoading";
import { Toolbar } from "~/components/shared-components/Toolbar";
import { useFormModal } from "~/hooks/useFormModal";
import { useGetSongsQuery } from "~/store/services/songsApiSlice";
import { Song } from "~/types/Song";
import { SongsTable } from "./components/SongsTable";
import { Modal } from "~/components/shared-components/Modal";
import { SongForm } from "./components/SongForm";

export default function SongsPage() {
  const {
    data: songsData,
    isLoading: songsIsLoading,
    isError: songsIsError,
  } = useGetSongsQuery();

  const {
    formModalIsOpen,
    selectedItem,
    handleOpenFormModal,
    handleCloseFormModal,
  } = useFormModal<Song>();

  return (
    <>
      <Toolbar title="Músicas" handleOpenModalForm={handleOpenFormModal} />

      {songsIsLoading && <DataLoading />}
      {songsIsError && <p>Failed to fetch user data</p>}

      {!songsIsLoading && songsData && (
        <SongsTable
          songs={songsData.songs}
          handleOpenFormModal={handleOpenFormModal}
        />
      )}

      {!songsIsLoading && !songsData && <p>No data available</p>}

      <Modal
        title="Música"
        isOpen={formModalIsOpen}
        handleCloseModal={handleCloseFormModal}
      >
        <SongForm
          selectedSong={selectedItem}
          handleCloseFormModal={handleCloseFormModal}
        />
      </Modal>
    </>
  );
}
