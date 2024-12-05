import { Fragment } from "react";
import { useGetArtistsQuery } from "~/store/services/artistsApiSlice";
import { ArtistsTable } from "./components/ArtistsTable";
import { Artist } from "~/types/Artist";
import { Modal } from "~/components/shared-components/Modal";
import { ArtistForm } from "./components/ArtistForm";
import { Toolbar } from "~/components/shared-components/Toolbar";
import { TableLoading } from "~/components/shared-components/Table/TableLoading";
import { useFilterDataFromQuery } from "~/hooks/useFilterDataFromQuery";
import { useFormModal } from "~/hooks/useFormModal";

const sortByOptions = [
  { value: "name:desc", label: "Nome do artista (A-Z)" },
  { value: "name:asc", label: "Nome do artista (Z-A)" },
  { value: "country:desc", label: "País (A-Z)" },
  { value: "country:asc", label: "País (Z-A)" },
];

export default function ArtistsPage() {
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

  const filteredData = useFilterDataFromQuery({
    records: artistsData?.artists ?? [],
    field: "name",
  });

  return (
    <Fragment>
      <Toolbar
        title="Artistas"
        sortByOptions={sortByOptions}
        handleOpenModalForm={handleOpenFormModal}
      />

      {artistsIsLoading && <TableLoading />}
      {artistsIsError && <p>aaa</p>}

      {!artistsIsLoading && !artistsIsError && artistsData && (
        <ArtistsTable
          artists={filteredData}
          handleOpenModalForm={handleOpenFormModal}
          artistsIsFetching={artistsIsFetching}
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
