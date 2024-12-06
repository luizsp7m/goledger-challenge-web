import { Fragment } from "react";
import { useGetArtistsQuery } from "~/store/services/artistsApiSlice";
import { ArtistsTable } from "./components/ArtistsTable";
import { Artist } from "~/types/Artist";
import { Modal } from "~/components/shared-components/Modal";
import { ArtistForm } from "./components/ArtistForm";
import { Toolbar } from "~/components/shared-components/Toolbar";
import { useFilterDataFromQuery } from "~/hooks/useFilterDataFromQuery";
import { useFormModal } from "~/hooks/useFormModal";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";

const sortByOptions = [
  { value: "name:asc", label: "Nome do artista (A-Z)" },
  { value: "name:desc", label: "Nome do artista (Z-A)" },
  { value: "country:asc", label: "País (A-Z)" },
  { value: "country:desc", label: "País (Z-A)" },
];

export default function ArtistList() {
  const {
    data: artistsData,
    isLoading: artistsIsLoading,
    isFetching: artistsIsFetching,
    isError: artistsIsError,
  } = useGetArtistsQuery();

  const {
    formModalIsOpen,
    selectedItem,
    handleOpenFormModal,
    handleCloseFormModal,
  } = useFormModal<Artist>();

  const { paginatedData, currentPage, totalPages } = useFilterDataFromQuery({
    records: artistsData?.artists ?? [],
    searchField: "name",
  });

  return (
    <Fragment>
      <Toolbar
        title="Artistas"
        sortByOptions={sortByOptions}
        handleOpenModalForm={handleOpenFormModal}
      />

      {artistsIsLoading && <DataLoading />}
      {artistsIsError && <ErrorMessage />}

      {!artistsIsLoading && !artistsIsError && artistsData && (
        <ArtistsTable
          artists={paginatedData}
          handleOpenModalForm={handleOpenFormModal}
          artistsIsFetching={artistsIsFetching}
          pagination={{ currentPage, totalPages }}
        />
      )}

      <Modal
        title="Artista"
        isOpen={formModalIsOpen}
        handleCloseModal={handleCloseFormModal}
      >
        <ArtistForm
          selectedArtist={selectedItem}
          handleCloseModal={handleCloseFormModal}
        />
      </Modal>
    </Fragment>
  );
}
