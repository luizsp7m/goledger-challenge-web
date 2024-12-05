import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { Table, TablePagination } from "~/components/shared-components/Table";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useDeletePlaylistMutation } from "~/store/services/playlistsApiSlice";
import { Playlist } from "~/types/Playlist";
import { OperationButton } from "~/components/shared-components/Table/OperationButton";

interface PlaylistsTableProps {
  playlists: Playlist[];
  handleOpenFormModal: (playlist?: Playlist) => void;
  playlistsIsFetching: boolean;
  pagination: TablePagination;
}

export function PlaylistsTable({
  playlists,
  handleOpenFormModal,
  playlistsIsFetching,
  pagination,
}: PlaylistsTableProps) {
  const [deletePlaylist, { isLoading: deleteIsLoading }] =
    useDeletePlaylistMutation();

  const {
    confirmDeleteModalIsOpen,
    selectedItem,
    handleOpenConfirmDeleteModal,
    handleCloseConfirmDeleteModal,
  } = useConfirmDeleteModal<Playlist>();

  return (
    <>
      <Table
        data={playlists}
        isFetching={playlistsIsFetching}
        pagination={pagination}
        columns={[
          { dataIndex: "name", title: "Nome da playlist" },
          {
            dataIndex: "private",
            title: "Pública",
            render: (playlist) => (!playlist.private ? "Sim" : "Não"),
          },

          {
            title: "",
            width: 48,
            render: (playlist) => (
              <OperationButton
                operationType="view"
                onClick={() => alert(playlist.id)}
              />
            ),
          },

          {
            title: "",
            width: 48,
            render: (playlist) => (
              <OperationButton
                operationType="update"
                onClick={() => handleOpenFormModal(playlist)}
              />
            ),
          },

          {
            title: "",
            width: 96,
            render: (playlist) => (
              <OperationButton
                operationType="delete"
                onClick={() => handleOpenConfirmDeleteModal(playlist)}
              />
            ),
          },
        ]}
      />

      <ConfirmDelete
        modalIsOpen={confirmDeleteModalIsOpen}
        handleCloseModal={handleCloseConfirmDeleteModal}
        message="Deseja excluir essa playlist?"
        deleteIsLoading={deleteIsLoading}
        removeRecord={() =>
          deletePlaylist({ playlistId: selectedItem?.id ?? "" }).unwrap()
        }
      />
    </>
  );
}
