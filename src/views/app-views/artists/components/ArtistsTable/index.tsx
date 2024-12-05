import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { DeleteButton } from "~/components/shared-components/DeleteButton";
import { Table, TablePagination } from "~/components/shared-components/Table";
import { TableEmpty } from "~/components/shared-components/Table/TableEmpty";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useDeleteArtistMutation } from "~/store/services/artistsApiSlice";
import { Artist } from "~/types/Artist";

interface ArtistsTableProps {
  artists?: Artist[];
  handleOpenModalForm: (artist?: Artist) => void;
  artistsIsFetching: boolean;
  pagination: TablePagination;
}

export function ArtistsTable({
  artists = [],
  handleOpenModalForm,
  artistsIsFetching,
  pagination,
}: ArtistsTableProps) {
  const [deleteArtist, { isLoading: deleteIsLoading }] =
    useDeleteArtistMutation();

  const {
    confirmDeleteModalIsOpen,
    selectedItem,
    handleOpenConfirmDeleteModal,
    handleCloseConfirmDeleteModal,
  } = useConfirmDeleteModal<Artist>();

  return (
    <>
      <Table isFetching={artistsIsFetching} pagination={pagination}>
        <thead>
          <tr>
            <th>Artista</th>
            <th>País</th>
            <th style={{ width: 96 }}></th>
          </tr>
        </thead>

        <tbody>
          {artists.length === 0 ? (
            <TableEmpty colSpan={3} />
          ) : (
            artists.map((artist) => (
              <tr key={artist.id} onClick={() => handleOpenModalForm(artist)}>
                <td>{artist.name}</td>
                <td>{artist.country}</td>

                <td>
                  <DeleteButton
                    handleDelete={() => handleOpenConfirmDeleteModal(artist)}
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
        message="Deseja excluir esse artista?"
        deleteIsLoading={deleteIsLoading}
        removeRecord={() =>
          deleteArtist({ artistId: selectedItem?.id ?? "" }).unwrap()
        }
      />
    </>
  );
}
