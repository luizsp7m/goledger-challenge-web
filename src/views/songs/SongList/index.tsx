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
  { value: "lastUpdated:asc", label: "Atualização mais antiga" },
  { value: "lastUpdated:desc", label: "Atualização mais recente" },
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

  const { paginatedData, currentPage, totalPages, totalItems } =
    useFilterDataFromQuery({
      records: songsData?.songs ?? [],
      searchField: "name",
    });

  return (
    <>
      <Toolbar
        title="Músicas"
        sortByOptions={sortByOptions}
        totalItems={totalItems}
        handleOpenModalForm={handleOpenFormModal}
      />

      {(songsIsLoading || (!songsData && songsIsFetching)) && <DataLoading />}

      {songsIsError && (
        <ErrorMessage message="Não foi possível carregar a lista de músicas" />
      )}

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
