import { ConfirmDelete } from "~/components/shared-components/ConfirmDelete";
import { DeleteButton } from "~/components/shared-components/DeleteButton";
import { Table } from "~/components/shared-components/Table";
import { useConfirmDeleteModal } from "~/hooks/useConfirmDeleteModal";
import { useDeleteAlbumMutation } from "~/store/services/albumsApiSlice";
import { Album } from "~/types/Album";

interface AlbumsTableProps {
  albums?: Album[];
  handleOpenFormModal: (album?: Album) => void;
}

export function AlbumsTable({
  albums = [],
  handleOpenFormModal,
}: AlbumsTableProps) {
  const [deleteAlbum, { isLoading: deleteIsLoading }] =
    useDeleteAlbumMutation();

  const {
    confirmDeleteModalIsOpen,
    selectedItem,
    handleOpenConfirmDeleteModal,
    handleCloseConfirmDeleteModal,
  } = useConfirmDeleteModal<Album>();

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Albúm</th>
            <th>Ano</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {albums.map((album) => (
            <tr key={album.id} onClick={() => handleOpenFormModal(album)}>
              <td>{album.name}</td>
              <td>{album.year}</td>

              <td width={96}>
                <DeleteButton
                  handleDelete={() => handleOpenConfirmDeleteModal(album)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmDelete
        modalIsOpen={confirmDeleteModalIsOpen}
        handleCloseModal={handleCloseConfirmDeleteModal}
        message="Deseja excluir esse álbum?"
        deleteIsLoading={deleteIsLoading}
        removeRecord={() =>
          deleteAlbum({ albumId: selectedItem?.id ?? "" }).unwrap()
        }
      />
    </>
  );
}
