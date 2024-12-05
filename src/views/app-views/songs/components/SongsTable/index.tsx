import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { DeleteButton } from "~/components/shared-components/DeleteButton";
import { Table, TablePagination } from "~/components/shared-components/Table";
import { TableEmpty } from "~/components/shared-components/Table/TableEmpty";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useDeleteSongMutation } from "~/store/services/songsApiSlice";
import { Song } from "~/types/Song";

interface SongsTableProps {
  songs?: Song[];
  handleOpenFormModal: (song?: Song) => void;
  songsIsFetching: boolean;
  pagination: TablePagination;
}

export function SongsTable({
  songs = [],
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
      <Table isFetching={songsIsFetching} pagination={pagination}>
        <thead>
          <tr>
            <th>Música</th>
            <th style={{ width: 96 }}></th>
          </tr>
        </thead>

        <tbody>
          {songs.length === 0 ? (
            <TableEmpty colSpan={2} />
          ) : (
            songs.map((song) => (
              <tr key={song.id} onClick={() => handleOpenFormModal(song)}>
                <td>{song.name}</td>

                <td>
                  <DeleteButton
                    handleDelete={() => handleOpenConfirmDeleteModal(song)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

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
