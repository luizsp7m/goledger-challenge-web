import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { DeleteButton } from "~/components/shared-components/DeleteButton";
import { Table } from "~/components/shared-components/Table";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useDeletePlaylistMutation } from "~/store/services/playlistsApiSlice";
import { Playlist } from "~/types/Playlist";

interface PlaylistsTableProps {
  playlists?: Playlist[];
  handleOpenFormModal: (playlist?: Playlist) => void;
}

export function PlaylistsTable({
  playlists = [],
  handleOpenFormModal,
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
      <Table>
        <thead>
          <tr>
            <th>Playlist</th>
            <th>Pública</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {playlists.map((playlist) => (
            <tr key={playlist.id} onClick={() => handleOpenFormModal(playlist)}>
              <td>{playlist.name}</td>
              <td>{playlist.private ? "Sim" : "Não"}</td>

              <td width={96}>
                <DeleteButton
                  handleDelete={() => handleOpenConfirmDeleteModal(playlist)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

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
