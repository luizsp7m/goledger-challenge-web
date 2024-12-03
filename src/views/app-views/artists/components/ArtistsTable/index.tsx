import { DeleteButton } from "~/components/shared-components/DeleteButton";
import { Table } from "~/components/shared-components/Table";
import { Artist } from "~/types/Artist";

interface ArtistsTableProps {
  artists?: Artist[];
  handleOpenModalForm: (artist: Artist | null) => void;
}

export function ArtistsTable({
  artists = [],
  handleOpenModalForm,
}: ArtistsTableProps) {
  return (
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
              <DeleteButton onDelete={() => alert("OK")} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
