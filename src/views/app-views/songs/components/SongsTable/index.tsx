import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { DeleteButton } from "~/components/shared-components/DeleteButton";
import { Table } from "~/components/shared-components/Table";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useDeleteSongMutation } from "~/store/services/songsApiSlice";
import { Song } from "~/types/Song";

interface SongsTableProps {
  songs?: Song[];
  handleOpenFormModal: (song?: Song) => void;
}

export function SongsTable({
  songs = [],
  handleOpenFormModal,
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
      <Table>
        <thead>
          <tr>
            <th>Música</th>
            <th style={{ width: 96 }}></th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song) => (
            <tr key={song.id} onClick={() => handleOpenFormModal(song)}>
              <td>{song.name}</td>

              <td>
                <DeleteButton
                  handleDelete={() => handleOpenConfirmDeleteModal(song)}
                />
              </td>
            </tr>
          ))}
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
