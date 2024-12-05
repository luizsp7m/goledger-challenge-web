import { DataLoading } from "~/components/shared-components/DataLoading";
import { Toolbar } from "~/components/shared-components/Toolbar";
import { useFormModal } from "~/hooks/useFormModal";
import { useGetSongsQuery } from "~/store/services/songsApiSlice";
import { Song } from "~/types/Song";
import { SongsTable } from "./components/SongsTable";
import { Modal } from "~/components/shared-components/Modal";
import { SongForm } from "./components/SongForm";
import { useFilterDataFromQuery } from "~/hooks/useFilterDataFromQuery";

const sortByOptions = [
  { value: "name:desc", label: "Nome da música (A-Z)" },
  { value: "name:asc", label: "Nome da música (Z-A)" },
];

export default function SongsPage() {
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

  const filteredData = useFilterDataFromQuery({
    records: songsData?.songs ?? [],
    field: "name",
  });

  return (
    <>
      <Toolbar
        title="Músicas"
        sortByOptions={sortByOptions}
        handleOpenModalForm={handleOpenFormModal}
      />

      {songsIsLoading && <DataLoading />}
      {songsIsError && <p>Failed to fetch user data</p>}

      {!songsIsLoading && songsData && (
        <SongsTable
          songs={filteredData}
          handleOpenFormModal={handleOpenFormModal}
          songsIsFetching={songsIsFetching}
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
