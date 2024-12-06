import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { Table, TablePagination } from "~/components/shared-components/Table";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useDeleteAlbumMutation } from "~/store/services/albumsApiSlice";
import { Album } from "~/types/Album";
import { OperationButton } from "~/components/shared-components/Table/OperationButton";
import { useNavigateTo } from "~/hooks/useNavigateTo";

interface AlbumsTableProps {
  albums: Album[];
  handleOpenFormModal: (album?: Album) => void;
  albumsIsFetching: boolean;
  pagination: TablePagination;
}

export function AlbumsTable({
  albums,
  handleOpenFormModal,
  albumsIsFetching,
  pagination,
}: AlbumsTableProps) {
  const { handleNavigateTo } = useNavigateTo();

  const [deleteAlbum, { isLoading: deleteIsLoading }] =
    useDeleteAlbumMutation();

  const {
    confirmDeleteModalIsOpen,
    selectedItem,
    handleOpenConfirmDeleteModal,
    handleCloseConfirmDeleteModal,
  } = useConfirmDeleteModal<Album>();

  return (
    <>
      <Table
        data={albums}
        isFetching={albumsIsFetching}
        pagination={pagination}
        columns={[
          { dataIndex: "name", title: "Nome do albúm" },
          { dataIndex: "year", title: "Ano de lançamento" },

          {
            title: "",
            width: 48,
            render: (album) => (
              <OperationButton
                operationType="view"
                onClick={() => handleNavigateTo(`/albums/${album.id}`)}
              />
            ),
          },

          {
            title: "",
            width: 48,
            render: (album) => (
              <OperationButton
                operationType="update"
                onClick={() => handleOpenFormModal(album)}
              />
            ),
          },

          {
            title: "",
            width: 96,
            render: (album) => (
              <OperationButton
                operationType="delete"
                onClick={() => handleOpenConfirmDeleteModal(album)}
              />
            ),
          },
        ]}
      />

      <ConfirmDelete
        modalIsOpen={confirmDeleteModalIsOpen}
        handleCloseModal={handleCloseConfirmDeleteModal}
        message="Deseja excluir esse álbum?"
        deleteIsLoading={deleteIsLoading}
        removeRecord={() =>
          deleteAlbum({ albumId: selectedItem?.id ?? "" }).unwrap()
        }
      />
    </>
  );
}
