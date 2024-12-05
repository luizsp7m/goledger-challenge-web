import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { DeleteButton } from "~/components/shared-components/DeleteButton";
import { Table, TablePagination } from "~/components/shared-components/Table";
import { TableEmpty } from "~/components/shared-components/Table/TableEmpty";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useDeletePlaylistMutation } from "~/store/services/playlistsApiSlice";
import { Playlist } from "~/types/Playlist";

interface PlaylistsTableProps {
  playlists?: Playlist[];
  handleOpenFormModal: (playlist?: Playlist) => void;
  playlistsIsFetching: boolean;
  pagination: TablePagination;
}

export function PlaylistsTable({
  playlists = [],
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
      <Table isFetching={playlistsIsFetching} pagination={pagination}>
        <thead>
          <tr>
            <th>Playlist</th>
            <th>Pública</th>
            <th style={{ width: 96 }}></th>
          </tr>
        </thead>

        <tbody>
          {playlists.length === 0 ? (
            <TableEmpty colSpan={3} />
          ) : (
            playlists.map((playlist) => (
              <tr
                key={playlist.id}
                onClick={() => handleOpenFormModal(playlist)}
              >
                <td>{playlist.name}</td>
                <td>{!playlist.private ? "Sim" : "Não"}</td>

                <td>
                  <DeleteButton
                    handleDelete={() => handleOpenConfirmDeleteModal(playlist)}
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
        message="Deseja excluir essa playlist?"
        deleteIsLoading={deleteIsLoading}
        removeRecord={() =>
          deletePlaylist({ playlistId: selectedItem?.id ?? "" }).unwrap()
        }
      />
    </>
  );
}
