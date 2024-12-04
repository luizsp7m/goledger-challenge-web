import { Fragment } from "react";
import { DataLoading } from "~/components/shared-components/DataLoading";
import { Toolbar } from "~/components/shared-components/Toolbar";
import { useGetAlbumsQuery } from "~/store/services/albumsApiSlice";
import { Album } from "~/types/Album";
import { AlbumsTable } from "./components/AlbumsTable";
import { Modal } from "~/components/shared-components/Modal";
import { AlbumForm } from "./components/AlbumForm";
import { useFormModal } from "~/hooks/useFormModal";

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

  return (
    <Fragment>
      <Toolbar title="Álbuns" handleOpenModalForm={handleOpenFormModal} />

      {albumsIsLoading && <DataLoading />}
      {albumsIsError && <p>Failed to fetch user data</p>}

      {!albumsIsLoading && albumsData && (
        <AlbumsTable
          albums={albumsData.albums}
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
