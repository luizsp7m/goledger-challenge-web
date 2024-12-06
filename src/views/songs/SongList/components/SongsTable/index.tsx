import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { Table, TablePagination } from "~/components/shared-components/Table";
import { OperationButton } from "~/components/shared-components/Table/OperationButton";
import { SONGS_PREFIX_PATH } from "~/configs/AppConfig";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useNavigateTo } from "~/hooks/useNavigateTo";
import { useDeleteSongMutation } from "~/store/services/songsApiSlice";
import { Song } from "~/types/Song";

interface SongsTableProps {
  songs: Song[];
  handleOpenFormModal: (song?: Song) => void;
  songsIsFetching: boolean;
  pagination: TablePagination;
}

export function SongsTable({
  songs,
  handleOpenFormModal,
  songsIsFetching,
  pagination,
}: SongsTableProps) {
  const [deleteSong, { isLoading: deleteIsLoading }] = useDeleteSongMutation();

  const {
    confirmDeleteModalIsOpen,
    selectedItem,
    handleOpenConfirmDeleteModal,
    handleCloseConfirmDeleteModal,
  } = useConfirmDeleteModal<Song>();

  const { handleNavigateTo } = useNavigateTo();

  return (
    <>
      <Table
        data={songs}
        isFetching={songsIsFetching}
        pagination={pagination}
        columns={[
          { dataIndex: "name", title: "Nome da música" },

          {
            title: "",
            width: 48,
            render: (album) => (
              <OperationButton
                operationType="view"
                onClick={() =>
                  handleNavigateTo(`${SONGS_PREFIX_PATH}/${album.id}`)
                }
              />
            ),
          },

          {
            title: "",
            width: 48,
            render: (song) => (
              <OperationButton
                operationType="update"
                onClick={() => handleOpenFormModal(song)}
              />
            ),
          },

          {
            title: "",
            width: 96,
            render: (song) => (
              <OperationButton
                operationType="delete"
                onClick={() => handleOpenConfirmDeleteModal(song)}
              />
            ),
          },
        ]}
      />

      <ConfirmDelete
        modalIsOpen={confirmDeleteModalIsOpen}
        handleCloseModal={handleCloseConfirmDeleteModal}
        message="Deseja excluir essa música?"
        deleteIsLoading={deleteIsLoading}
        removeRecord={() =>
          deleteSong({ songId: selectedItem?.id ?? "" }).unwrap()
        }
      />
    </>
  );
}
