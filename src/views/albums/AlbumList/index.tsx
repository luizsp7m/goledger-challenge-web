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
import { ErrorMessage } from "~/components/shared-components/ErrorMessage";

const sortByOptions = [
  { value: "name:asc", label: "Nome do albúm (A-Z)" },
  { value: "name:desc", label: "Nome do albúm (Z-A)" },
  { value: "year:asc", label: "Ano (mais antigo)" },
  { value: "year:desc", label: "Ano (mais recente)" },
  { value: "lastUpdated:asc", label: "Atualização mais antiga" },
  { value: "lastUpdated:desc", label: "Atualização mais recente" },
];

export default function AlbumList() {
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

  const { paginatedData, currentPage, totalPages, totalItems } =
    useFilterDataFromQuery({
      records: albumsData?.albums ?? [],
      searchField: "name",
    });

  return (
    <Fragment>
      <Toolbar
        title="Álbuns"
        sortByOptions={sortByOptions}
        totalItems={totalItems}
        handleOpenModalForm={handleOpenFormModal}
      />

      {(albumsIsLoading || (!albumsData && albumsIsFetching)) && (
        <DataLoading />
      )}

      {albumsIsError && (
        <ErrorMessage message="Não foi possível carregar a lista de álbums" />
      )}

      {!albumsIsLoading && !albumsIsError && albumsData && (
        <AlbumsTable
          albums={paginatedData}
          handleOpenFormModal={handleOpenFormModal}
          albumsIsFetching={albumsIsFetching}
          pagination={{ currentPage, totalPages }}
        />
      )}

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
