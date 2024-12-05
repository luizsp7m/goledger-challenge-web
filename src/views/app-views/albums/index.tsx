import { Fragment } from "react";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { Toolbar } from "~/components/shared-components/Toolbar";
import { useGetAlbumsQuery } from "~/store/services/albumsApiSlice";
import { Album } from "~/types/Album";
import { AlbumsTable } from "./components/AlbumsTable";
import { Modal } from "~/components/shared-components/Modal";
import { AlbumForm } from "./components/AlbumForm";
import { useFormModal } from "~/hooks/useFormModal";
import { useFilterDataFromQuery } from "~/hooks/useFilterDataFromQuery";

const sortByOptions = [
  { value: "name:desc", label: "Nome do albúm (A-Z)" },
  { value: "name:asc", label: "Nome do albúm (Z-A)" },
  { value: "year:desc", label: "Ano (mais recente)" },
  { value: "year:asc", label: "Ano (mais antigo)" },
];

export default function AlbumsPage() {
  const {
    data: albumsData,
    isLoading: albumsIsLoading,
    isFetching: albumsIsFetching,
    isError: albumsIsError,
  } = useGetAlbumsQuery();

  const {
    formModalIsOpen,
    selectedItem,
    handleOpenFormModal,
    handleCloseFormModal,
  } = useFormModal<Album>();

  const filteredData = useFilterDataFromQuery({
    records: albumsData?.albums ?? [],
    field: "name",
  });

  return (
    <Fragment>
      <Toolbar
        title="Álbuns"
        sortByOptions={sortByOptions}
        handleOpenModalForm={handleOpenFormModal}
      />

      {albumsIsLoading && <DataLoading />}
      {albumsIsError && <p>Failed to fetch user data</p>}

      {!albumsIsLoading && albumsData && (
        <AlbumsTable
          albums={filteredData}
          handleOpenFormModal={handleOpenFormModal}
          albumsIsFetching={albumsIsFetching}
        />
      )}

      {!albumsIsLoading && !albumsData && <p>No data available</p>}

      <Modal
        title="Albúm"
        isOpen={formModalIsOpen}
        handleCloseModal={handleCloseFormModal}
      >
        <AlbumForm
          selectedAlbum={selectedItem}
          handleCloseFormModal={handleCloseFormModal}
        />
      </Modal>
    </Fragment>
  );
}
