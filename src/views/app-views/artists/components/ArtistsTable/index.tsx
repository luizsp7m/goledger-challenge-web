import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { DeleteButton } from "~/components/shared-components/DeleteButton";
import { Table } from "~/components/shared-components/Table";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useDeleteArtistMutation } from "~/store/services/artistsApiSlice";
import { Artist } from "~/types/Artist";

interface ArtistsTableProps {
  artists?: Artist[];
  handleOpenModalForm: (artist?: Artist) => void;
}

export function ArtistsTable({
  artists = [],
  handleOpenModalForm,
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
      <Table>
        <thead>
          <tr>
            <th>Artista</th>
            <th>País</th>
            <th style={{ width: 96 }}></th>
          </tr>
        </thead>

        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id} onClick={() => handleOpenModalForm(artist)}>
              <td>{artist.name}</td>
              <td>{artist.country}</td>

              <td>
                <DeleteButton
                  handleDelete={() => handleOpenConfirmDeleteModal(artist)}
                />
              </td>
            </tr>
          ))}
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
