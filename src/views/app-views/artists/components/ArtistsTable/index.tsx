import { useNavigate } from "react-router-dom";
import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { Table, TablePagination } from "~/components/shared-components/Table";
import { OperationButton } from "~/components/shared-components/Table/OperationButton";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useDeleteArtistMutation } from "~/store/services/artistsApiSlice";
import { Artist } from "~/types/Artist";

interface ArtistsTableProps {
  artists: Artist[];
  handleOpenModalForm: (artist?: Artist) => void;
  artistsIsFetching: boolean;
  pagination: TablePagination;
}

export function ArtistsTable({
  artists,
  handleOpenModalForm,
  artistsIsFetching,
  pagination,
}: ArtistsTableProps) {
  const navigate = useNavigate();

  const [deleteArtist, { isLoading: deleteIsLoading }] =
    useDeleteArtistMutation();

  const {
    confirmDeleteModalIsOpen,
    selectedItem,
    handleOpenConfirmDeleteModal,
    handleCloseConfirmDeleteModal,
  } = useConfirmDeleteModal<Artist>();

  function handleNavigateToViewArtist(artist: Artist) {
    navigate(`/artists/${artist.id}`);
  }

  return (
    <>
      <Table
        data={artists}
        isFetching={artistsIsFetching}
        pagination={pagination}
        columns={[
          { dataIndex: "name", title: "Nome do artista" },
          { dataIndex: "country", title: "País" },

          {
            title: "",
            width: 48,
            render: (artist) => (
              <OperationButton
                operationType="view"
                onClick={() => handleNavigateToViewArtist(artist)}
              />
            ),
          },

          {
            title: "",
            width: 48,
            render: (artist) => (
              <OperationButton
                operationType="update"
                onClick={() => handleOpenModalForm(artist)}
              />
            ),
          },

          {
            title: "",
            width: 96,
            render: (artist) => (
              <OperationButton
                operationType="delete"
                onClick={() => handleOpenConfirmDeleteModal(artist)}
              />
            ),
          },
        ]}
      />

      <ConfirmDelete
        modalIsOpen={confirmDeleteModalIsOpen}
        handleCloseModal={handleCloseConfirmDeleteModal}
        message="Deseja excluir esse artista?"
        deleteIsLoading={deleteIsLoading}
        removeRecord={() =>
          deleteArtist({ artistId: selectedItem?.id ?? "" }).unwrap()
        }
      />
    </>
  );
}
