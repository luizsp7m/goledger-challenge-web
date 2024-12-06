import { DataLoading } from "~/components/shared-components/DataLoading";
import { Toolbar } from "~/components/shared-components/Toolbar";
import { useFormModal } from "~/hooks/useFormModal";
import { useGetSongsQuery } from "~/store/services/songsApiSlice";
import { Song } from "~/types/Song";
import { SongsTable } from "./components/SongsTable";
import { Modal } from "~/components/shared-components/Modal";
import { SongForm } from "./components/SongForm";
import { useFilterDataFromQuery } from "~/hooks/useFilterDataFromQuery";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";

const sortByOptions = [
  { value: "name:asc", label: "Nome da música (A-Z)" },
  { value: "name:desc", label: "Nome da música (Z-A)" },
];

export default function SongList() {
  const {
    data: songsData,
    isLoading: songsIsLoading,
    isFetching: songsIsFetching,
    isError: songsIsError,
  } = useGetSongsQuery();

  const {
    formModalIsOpen,
    selectedItem,
    handleOpenFormModal,
    handleCloseFormModal,
  } = useFormModal<Song>();

  const { paginatedData, currentPage, totalPages } = useFilterDataFromQuery({
    records: songsData?.songs ?? [],
    searchField: "name",
  });

  return (
    <>
      <Toolbar
        title="Músicas"
        sortByOptions={sortByOptions}
        handleOpenModalForm={handleOpenFormModal}
      />

      {songsIsLoading && <DataLoading />}
      {songsIsError && <ErrorMessage />}

      {!songsIsLoading && !songsIsError && songsData && (
        <SongsTable
          songs={paginatedData}
          handleOpenFormModal={handleOpenFormModal}
          songsIsFetching={songsIsFetching}
          pagination={{ currentPage, totalPages }}
        />
      )}

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
