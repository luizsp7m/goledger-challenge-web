import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { Table, TablePagination } from "~/components/shared-components/Table";
import { OperationButton } from "~/components/shared-components/Table/OperationButton";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useDeleteSongMutation } from "~/store/services/songsApiSlice";
import { Song } from "~/types/Song";
import { dateFormatter } from "~/utils/dateFormatter";

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

  return (
    <>
      <Table
        data={songs}
        isFetching={songsIsFetching}
        pagination={pagination}
        columns={[
          { dataIndex: "name", title: "Nome da música" },

          {
            dataIndex: "lastUpdated",
            title: "Última atualização",
            render: (song) => dateFormatter(song.lastUpdated),
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
        deleteIsLoading={deleteIsLoading}
        removeRecord={() =>
          deleteSong({ songId: selectedItem?.id ?? "" }).unwrap()
        }
      />
    </>
  );
}
