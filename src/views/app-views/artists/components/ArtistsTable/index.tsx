import { useState } from "react";
import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { DeleteButton } from "~/components/shared-components/DeleteButton";
import { Table } from "~/components/shared-components/Table";
import { useDeleteArtistMutation } from "~/store/services/artistsApiSlice";
import { Artist } from "~/types/Artist";

interface ConfirmDeleteModal {
  isOpen: boolean;
  artistId: string | null;
}

interface ArtistsTableProps {
  artists?: Artist[];
  handleOpenModalForm: (artist: Artist | null) => void;
}

export function ArtistsTable({
  artists = [],
  handleOpenModalForm,
}: ArtistsTableProps) {
  const [deleteArtist, { isLoading: isDeleting }] = useDeleteArtistMutation();

  const [confirmDeleteModal, setConfirmDeleteModal] =
    useState<ConfirmDeleteModal>({
      isOpen: false,
      artistId: null,
    });

  function handleOpenConfirmDeleteModal(artistId: string) {
    setConfirmDeleteModal({
      isOpen: true,
      artistId,
    });
  }

  function handleCloseConfirmDeleteModal() {
    setConfirmDeleteModal({
      isOpen: false,
      artistId: null,
    });
  }

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Artista</th>
            <th>País</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id} onClick={() => handleOpenModalForm(artist)}>
              <td>{artist.name}</td>
              <td>{artist.country}</td>

              <td width={96}>
                <DeleteButton
                  handleDelete={() => handleOpenConfirmDeleteModal(artist.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmDelete
        modalIsOpen={confirmDeleteModal.isOpen}
        handleCloseModal={handleCloseConfirmDeleteModal}
        message="Deseja excluir esse artista?"
        isDeleting={isDeleting}
        removeRecord={() =>
          deleteArtist({ artistId: confirmDeleteModal.artistId! }).unwrap()
        }
      />
    </>
  );
}
