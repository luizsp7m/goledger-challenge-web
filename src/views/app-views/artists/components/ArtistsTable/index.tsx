import { DeleteButton } from "~/components/shared-components/DeleteButton";
import { Table } from "~/components/shared-components/Table";
import { Artist } from "~/types/Artist";

interface ArtistsTableProps {
  artists?: Artist[];
}

export function ArtistsTable({ artists = [] }: ArtistsTableProps) {
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
          <tr key={artist.id}>
            <td>{artist.name}</td>
            <td>{artist.country}</td>

            <td width={96}>
              <DeleteButton />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
